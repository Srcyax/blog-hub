import CreatePost from "./create/postCreate";

export default function Post() {
	return (
		<main className="flex flex-col justify-center items-center mt-40">
			<h1 className="m-5 text-3xl font-semibold">Create Post</h1>
			<div className="flex flex-col justify-center items-center gap-4 shadow-3xl border-2 p-5 rounded-md">
				<CreatePost />
			</div>
		</main>
	);
}
