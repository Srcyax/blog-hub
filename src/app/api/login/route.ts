import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

export async function POST(req: NextRequest) {
	const body = await req.json();

	const prisma = new PrismaClient();

	const user = await prisma.user.findUnique({
		where: {
			username: body.username,
			password: body.password,
		},
	});

	if (!user) {
		return NextResponse.json({ error: "User not found" }, { status: 404 });
	}

	return NextResponse.json({ user }, { status: 200 });
}

/*export default async function handler(req, res) {
	const { method } = req;
	const prisma = new PrismaClient();

	switch (method) {
		case "POST":
			try {
				const user = await prisma.user.findUnique({
					where: {
						username: req.body.username,
						password: req.body.password,
					},
				});

				if (!user) {
					return res.status(404).json({ message: "User not found" });
				}

				return res.status(200).json({ user });
			} catch (error) {
			} finally {
				await prisma.$disconnect();
			}

			break;
	}
}*/
