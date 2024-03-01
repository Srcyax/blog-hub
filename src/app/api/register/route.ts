import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function POST(req: NextRequest) {
	const body = await req.json();

	const prisma = new PrismaClient();

	if (
		!body.username?.replace(/[^a-zA-Z0-9 ]/g, "") ||
		!body.password?.replace(/[^a-zA-Z0-9 ]/g, "")
	) {
		return NextResponse.json(
			{ error: "Special characters are not allowed" },
			{ status: 200 }
		);
	}

	if (!body.username.trim()) {
		return NextResponse.json(
			{ error: "The username is invalid" },
			{ status: 200 }
		);
	}

	if (!body.password.trim()) {
		return NextResponse.json(
			{ error: "The password is invalid" },
			{ status: 200 }
		);
	}

	if (body.username.length > 10) {
		return NextResponse.json(
			{ error: "Its username is very extensive" },
			{ status: 200 }
		);
	}
	if (body.password.length > 24) {
		return NextResponse.json(
			{ error: "Its password is very extensive" },
			{ status: 200 }
		);
	}

	try {
		const passwordHash = await bcrypt.hash(body.password, 10);

		const user = await prisma.user.create({
			data: {
				username: body.username,
				password: passwordHash as string,
				role: "USER",
				bio: "Hi, I'm using BlogHub!",
			},
		});

		const { password, ...userData } = user;

		return NextResponse.json({ userData }, { status: 200 });
	} catch (err) {
		if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
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
