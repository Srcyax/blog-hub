import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function POST(req: NextRequest) {
	const body = await req.json();

	const prisma = new PrismaClient();

	if (body.username.length > 10) {
		return NextResponse.json(
			{ error: "Its content is very extensive" },
			{ status: 500 }
		);
	}

	try {
		const user = await prisma.user.create({
			data: {
				username: body.username,
				password: body.password,
			},
		});

		return NextResponse.json({ user }, { status: 200 });
	} catch (err) {
		if (
			err instanceof PrismaClientKnownRequestError &&
			err.code === "P2002"
		) {
			return NextResponse.json(
				{ error: "This user is already registered" },
				{ status: 400 }
			);
		} else {
			return NextResponse.json(
				{ error: "Error registering user" },
				{ status: 400 }
			);
		}
	}
}
