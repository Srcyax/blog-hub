import { PrismaClient, PrismaClientKnownRequestError } from "@prisma/client";

export default async function handler(req, res) {
	const { method } = req;
	const prisma = new PrismaClient();

	switch (method) {
		case "POST":
			try {
				const post = await prisma.post.delete({
					where: {
						id: req.body.id,
						title: req.body.title,
					},
				});

				return res.status(200).json({
					message: "Deleted",
				});
			} catch (error) {
				return console.log(error);
			} finally {
				await prisma.$disconnect();
			}
	}
}
