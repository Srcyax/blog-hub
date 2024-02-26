import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const body = await req.json();

	const prisma = new PrismaClient();

	try {
		const post = await prisma.post.findUnique({
			where: {
				id: body.id,
			},
		});

		if (!post) {
			return NextResponse.json({ error: "Post not found" }, { status: 404 });
		}

		if (post.authorId !== body.userId) {
			return NextResponse.json(
				{ error: "You do not have permission to delete this post." },
				{ status: 403 }
			);
		}

		const deletedPost = await prisma.post.delete({
			where: {
				id: body.id,
			},
		});
		return NextResponse.json({ message: "Successfully deleted" });
	} catch (error) {
		return NextResponse.json({ error: error });
	} finally {
		await prisma.$disconnect();
	}
}
