export var users = [];

export default function handler(req, res) {
	const { method } = req;

	switch (method) {
		case "POST":
			users.push(req.body);
			res.status(200).json({
				message: "Sucess",
				users,
			});
			break;
		case "GET":
			res.status(200).json({ users });
			break;
	}
}
