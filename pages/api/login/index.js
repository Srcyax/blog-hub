import { PrismaClient, PrismaClientKnownRequestError } from "@prisma/client";

export var users = [];

export default async function handler(req, res) {
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
}
