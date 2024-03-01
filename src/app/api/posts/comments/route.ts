import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import JWT, { JwtHeader, JwtPayload } from "jsonwebtoken";
export async function POST(req: NextRequest) {
	const body = await req.json();

	const prisma = new PrismaClient();

	var hasToken = cookies().has("acess_token");

	if (!hasToken) {
		return NextResponse.json({ error: "User not allowed" }, { status: 401 });
	}

	try {
		const token = cookies().get("acess_token")?.value as string;

		const user = JWT.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

		if (!user) {
			return NextResponse.json({ error: "User not allowed" }, { status: 401 });
		}

		const comment = await prisma.comment.create({
			data: {
				content: body.content,
				userId: body.id,
			},
		});

		const userWhoWasCommented = await prisma.user.findUnique({
			where: {
				id: user.id,
			},
			include: {
				comment: true,
			},
		});

		return NextResponse.json(
			{ message: "Comment sent successfully", userWhoWasCommented },
			{ status: 200 }
		);
	} catch (error) {
	} finally {
		await prisma.$disconnect();
	}
}
