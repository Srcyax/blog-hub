import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import JWT, { JwtPayload } from "jsonwebtoken";

export async function POST(req: NextRequest) {
	const body = await req.json();
	const prisma = new PrismaClient();

	try {
		const profile = await prisma.user.findUnique({
			where: {
				id: body.id,
			},
			include: {
				comment: true,
			},
		});

		if (!profile) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		const { password, ...user } = profile;
		return NextResponse.json({ user });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: err }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}
