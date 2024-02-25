import { PrismaClient, PrismaClientKnownRequestError } from "@prisma/client";

export default async function handler(req, res) {
	const { method } = req;
	const prisma = new PrismaClient();

	switch (method) {
		case "POST":
			try {
				const user = await prisma.user.create({
					data: {
						username: req.body.username,
						password: req.body.password,
					},
				});

				res.status(200).json({
					message: "User registered successfully",
					user,
				});
			} catch (error) {
				if (
					error instanceof PrismaClientKnownRequestError &&
					error.code === "P2002"
				) {
					res.status(400).json({
						message: "This user is already registered",
					});
				} else {
					res.status(500).json({
						message: "Error registering user",
						error: error.message,
					});
				}
			} finally {
				await prisma.$disconnect();
			}
			break;
	}
}
