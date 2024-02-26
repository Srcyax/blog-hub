import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const body = await req.json();

	const prisma = new PrismaClient();

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: body.userId,
			},
		});

		return NextResponse.json({ user }, { status: 200 });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: err }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}
