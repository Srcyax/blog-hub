import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import JWT, { JwtPayload } from "jsonwebtoken";

export async function POST(req: NextRequest) {
	const body = await req.json();

	const prisma = new PrismaClient();

	var hasToken = cookies().has("acess_token");

	if (!hasToken) {
		return NextResponse.json({ error: "Not authorized" }, { status: 401 });
	}

	const token = cookies().get("acess_token")?.value;

	try {
		const { id } = JWT.verify(
			token as string,
			process.env.JWT_SECRET as string
		) as JwtPayload;

		if (body.id !== id) {
			return NextResponse.json({ error: "Not authorized" }, { status: 401 });
		}

		const profile = await prisma.user.update({
			where: {
				id: body.id,
			},
			data: {
				bio: body.bio,
			},
		});

		return NextResponse.json(
			{ message: "Bio changed successfully" },
			{ status: 200 }
		);
	} catch (err) {
		return NextResponse.json({ error: err }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}
