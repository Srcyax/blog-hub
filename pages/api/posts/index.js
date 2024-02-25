import { PrismaClient, PrismaClientKnownRequestError } from "@prisma/client";

export default async function handler(req, res) {
	const { method } = req;
	const prisma = new PrismaClient();

	switch (method) {
		case "POST":
			const post = await prisma.post.create({
				data: {
					title: req.body.title,
					content: req.body.content,
					author: req.body.author,
					authorId: 0,
				},
			});
			return res.status(200).json({
				message: "Sucess",
				post,
			});
		case "GET":
			const posts = await prisma.post.findMany();
			return res.status(200).json({ posts });
	}
}
