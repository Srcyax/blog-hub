import { PrismaClient } from "@prisma/client";
import JWT from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const prisma = new PrismaClient();
	var hasToken = cookies().has("acess_token");

	if (!hasToken) {
		return NextResponse.json({ error: "User not allowed" });
	}

	try {
		const token = cookies().get("acess_token")?.value as string;
		var user = JWT.decode(token) as JwtPayload;

		return NextResponse.json({ user }, { status: 200 });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: err }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}
