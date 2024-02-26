import { PrismaClient } from "@prisma/client";
import { AwardIcon } from "lucide-react";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const body = await req.json();

	const prisma = new PrismaClient();

	try {
		const updatePost = await prisma.post.update({
			where: {
				id: body.id,
			},
			data: {
				title: body.newTitle,
				content: body.newContent,
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
