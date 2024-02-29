import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import JWT, { JwtPayload } from "jsonwebtoken";

export async function POST(req: NextRequest) {
	const body = await req.json();

	const prisma = new PrismaClient();

	const hasToken = cookies().has("acess_token");

	if (!hasToken) return NextResponse.json({ error: "User not allowed" });

	try {
		const post = await prisma.post.findUnique({
			where: {
				id: body.id,
			},
		});

		if (!post) {
			return NextResponse.json({ error: "Post not found" }, { status: 404 });
		}

		const token = cookies().get("acess_token")?.value as string;
		const { id } = JWT.verify(
			token as string,
			process.env.JWT_SECRET as string
		) as JwtPayload;

		if (post.authorId !== id) {
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
