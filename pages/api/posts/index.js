export var posts = [];

export default function handler(req, res) {
	const { method } = req;

	switch (method) {
		case "POST":
			posts.push(req.body);
			res.status(200).json({
				message: "Sucess",
				posts,
			});
			break;
		case "GET":
			res.status(200).json({ posts });
			break;
	}
}
