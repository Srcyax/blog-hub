import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function POST(req: NextRequest) {
	const body = await req.json();

	const prisma = new PrismaClient();

	try {
		const passwordHash = await bcrypt.hash(body.password, 10);

		const user = await prisma.user.create({
			data: {
				username: body.username,
				password: passwordHash as string,
			},
		});

		const { password, ...userData } = user;

		return NextResponse.json({ userData }, { status: 200 });
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
