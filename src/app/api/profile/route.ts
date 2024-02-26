import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const body = await req.json();

	const prisma = new PrismaClient();

	if (body.newUsername.length > 10) {
		return NextResponse.json(
			{ error: "Its content is very extensive" },
			{ status: 500 }
		);
	}

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: body.userId,
			},
		});

		if (user?.username === body.newUsername) {
			return NextResponse.json(
				{ message: "The username cannot be the same" },
				{ status: 500 }
			);
		}

		const profile = await prisma.user.update({
			where: {
				id: body.userId,
			},
			data: {
				username: body.newUsername,
			},
		});

		await prisma.post.updateMany({
			where: {
				authorId: body.userId,
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
