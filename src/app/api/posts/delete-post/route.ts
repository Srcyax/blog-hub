import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const body = await req.json();

	const prisma = new PrismaClient();

	try {
		const post = await prisma.post.delete({
			where: {
				id: body.id,
				title: body.title,
			},
		});

		return NextResponse.json({ message: "Successfully deleted" });
	} catch (error) {
		return NextResponse.json({ error: error });
	} finally {
		await prisma.$disconnect();
	}
}
