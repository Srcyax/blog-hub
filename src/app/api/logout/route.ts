import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	cookies().delete("acess_token");
	return NextResponse.json("OK");
}
