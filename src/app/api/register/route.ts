import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import JWT from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
	const body = await req.json();

	const prisma = new PrismaClient();

	if (body.username.length > 10) {
		return NextResponse.json(
			{ error: "Its content is very extensive" },
			{ status: 500 }
		);
	}

	var token = cookies().has("acess_token");

	if (token) {
		cookies().delete("acess_token");
	}

	try {
		const user = await prisma.user.create({
			data: {
				username: body.username,
				password: body.password,
			},
		});

		const acessToken = JWT.sign(
			{ username: user.username, id: user.id },
			"de46ecc96f271479dc9f6f486a2494e308ff4d8a16eddf2dc8007286cbcb7aa5"
		);

		cookies().set("acess_token", acessToken, {
			maxAge: 60 * 60 * 24 * 30 * 1000,
			secure: false,
			httpOnly: false,
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
	} finally {
		await prisma.$disconnect();
	}
}
