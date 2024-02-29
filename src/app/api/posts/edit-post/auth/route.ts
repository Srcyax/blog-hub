import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import JWT, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

export async function POST(req: NextRequest) {
	const body = await req.json();
	const prisma = new PrismaClient();

	const hasToken = cookies().has("acess_token");

	if (!hasToken) return NextResponse.json(false);

	var token = cookies().get("acess_token")?.value as string;

	var { id } = JWT.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

	try {
		const post = await prisma.post.findUnique({
			where: {
				id: body.id,
			},
		});

		if (!post) {
			return NextResponse.json(false);
		}

		if (post.authorId !== id) {
			return NextResponse.json(false);
		}

		return NextResponse.json(true);
	} catch (err) {
		console.log(err);
	}
}
