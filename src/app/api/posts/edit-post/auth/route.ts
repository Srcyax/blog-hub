import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import JWT, { JwtPayload } from "jsonwebtoken";

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { authorId } = body;

	const hasToken = cookies().has("acess_token");

	if (!hasToken) return NextResponse.json(false);

	var token = cookies().get("acess_token")?.value as string;

	var user = JWT.decode(token) as JwtPayload;

	try {
		if (user.id !== authorId) {
			return NextResponse.json(false);
		}

		return NextResponse.json(true);
	} catch (err) {
		console.log(err);
	}
}
