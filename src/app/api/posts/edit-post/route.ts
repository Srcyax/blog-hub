import { PrismaClient } from "@prisma/client";
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
		const updatePost = await prisma.post.update({
			where: {
				id: body.id,
			},
			data: {
				title: title,
				content: content,
			},
		});

		return NextResponse.json(
			{ message: "Post edited successfully" },
			{ status: 200 }
		);
	} catch (err) {
		return NextResponse.json({ error: err }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}
