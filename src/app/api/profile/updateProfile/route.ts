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

		const profile = await prisma.user.update({
			where: {
				id: id,
			},
			data: {
				username: body.newUsername,
			},
		});

		if (!profile) {
			return NextResponse.json(
				{ error: "Not authorized" },
				{ status: 401 }
			);
		}

		console.log(profile.username);

		await prisma.post.updateMany({
			where: {
				authorId: id,
			},
			data: {
				author: body.newUsername,
			},
		});

		return NextResponse.json(
			{ message: "Username changed successfully", profile },
			{ status: 200 }
		);
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: err }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}
