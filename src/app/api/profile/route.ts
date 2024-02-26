import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const body = await req.json();

	const prisma = new PrismaClient();
	try {
		const profile = await prisma.user.update({
			where: {
				id: body.userId,
			},
			data: {
				username: body.newUsername,
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
