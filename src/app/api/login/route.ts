import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

export async function POST(req: NextRequest) {
	const body = await req.json();

	const prisma = new PrismaClient();

	const user = await prisma.user.findUnique({
		where: {
			username: body.username,
			password: body.password,
		},
	});

	if (!user) {
		return NextResponse.json({ error: "User not found" }, { status: 404 });
	}

	return NextResponse.json({ user }, { status: 200 });
}
