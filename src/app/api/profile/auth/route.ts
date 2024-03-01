import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import JWT, { JwtPayload } from "jsonwebtoken";

export async function POST(req: NextRequest) {
	const body = await req.json();

	var token = cookies().get("acess_token")?.value as string;
	const { id } = JWT.verify(
		token,
		process.env.JWT_SECRET as string
	) as JwtPayload;

	try {
		if (body.id !== id) {
			return NextResponse.json(false);
		}

		return NextResponse.json(true);
	} catch (err) {
		console.log(err);
	}
}
