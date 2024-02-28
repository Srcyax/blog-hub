import CreatePost from "./create/postCreate";

export default function Post() {
	return (
		<main className="flex flex-col justify-center items-center mt-40">
			<h1 className="m-5 text-3xl font-semibold">Create Post</h1>

			<CreatePost />
		</main>
	);
}
