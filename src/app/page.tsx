export default function Home() {
	return (
		<main className="flex flex-col justify-center items-center w-full h-full">
			<h1 className="m-5 text-3xl font-semibold">Blogs</h1>
			<div>
				<div className="flex flex-col justify-center items-center w-72 shadow-3xl border-2 rounded-md">
					<h1 className="m-3 text-2xl">Title</h1>
					<p className="m-5 text-wrap leading-relaxed">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Earum, quae facilis sit voluptates deleniti iste quam
						eum voluptas unde rerum commodi! Assumenda, ut fuga
						quidem necessitatibus nemo ipsum totam cumque.
					</p>
				</div>
			</div>
		</main>
	);
}
