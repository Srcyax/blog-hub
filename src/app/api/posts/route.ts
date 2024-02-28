import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { title, content } = body;
	const prisma = new PrismaClient();

	if (
		!title?.replace(/[^a-zA-Z0-9 ]/g, "") ||
		!content?.replace(/[^a-zA-Z0-9 ]/g, "")
	) {
		return NextResponse.json(
			{ error: "Special characters are not allowed" },
			{ status: 500 }
		);
	}

	if (!title.trim()) {
		return NextResponse.json({ error: "The title is invalid" }, { status: 500 });
	}

	if (!content.trim()) {
		return NextResponse.json(
			{ error: "The content is invalid" },
			{ status: 500 }
		);
	}

	if (title.length > 25) {
		return NextResponse.json(
			{ error: "Its title is very extensive" },
			{ status: 500 }
		);
	}
	if (content.length > 255) {
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

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		const post = await prisma.post.create({
			data: {
				title: title,
				content: content,
				author: user.username,
				authorId: user.id,
			},
		});
		return NextResponse.json({ message: "Sucess", post }, { status: 200 });
	} catch (err) {
		console.log(err);
		if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
			return NextResponse.json(
				{ error: "This title is already posted" },
				{ status: 403 }
			);
		}
	} finally {
		await prisma.$disconnect();
	}
}

export async function GET(req: NextRequest) {
	const prisma = new PrismaClient();
	const posts = await prisma.post.findMany();
	return NextResponse.json({ posts }, { status: 200 });
}
