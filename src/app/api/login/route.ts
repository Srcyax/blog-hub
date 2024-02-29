import { NextRequest, NextResponse } from "next/server";
import JWT from "jsonwebtoken";
import { cookies } from "next/headers";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
export async function POST(req: NextRequest) {
	const body = await req.json();

	const prisma = new PrismaClient();

	var token = cookies().has("acess_token");

	if (token) {
		cookies().delete("acess_token");
	}

	try {
		const user = await prisma.user.findUnique({
			where: {
				username: body.username,
			},
		});

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		const passwordVerify = await bcrypt.compare(
			body.password,
			user?.password as string
		);

		if (!passwordVerify) {
			return NextResponse.json({ error: "Wrong password" }, { status: 404 });
		}

		const acessToken = JWT.sign(
			{ username: user.username, id: user.id },
			process.env.JWT_SECRET as string,
			{
				expiresIn: "2h",
			}
		);

		cookies().set("acess_token", acessToken, {
			maxAge: 60 * 120,
			secure: false,
			httpOnly: true,
		});

		const { password, ...userData } = user;

		return NextResponse.json({ userData }, { status: 200 });
	} catch (err) {
		return NextResponse.json({ error: err }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}
