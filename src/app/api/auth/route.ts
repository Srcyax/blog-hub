import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import JWT, { JwtPayload, Secret } from "jsonwebtoken";

export async function GET(req: NextRequest) {
	var token = cookies().get("acess_token")?.value as string;

	var authenticated = JWT.verify(token, process.env.JWT_SECRET as string);

	try {
		if (!authenticated) {
			return NextResponse.json(false);
		}

		return NextResponse.json(true);
	} catch (err) {
		console.log(err);
	}
}
