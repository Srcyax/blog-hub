interface PostInfo {
	title: string;
	content: string;
	author: string;
}

export default function BlogPost({ title, content, author }: PostInfo) {
	return (
		<div className="flex flex-col justify-between w-72 h-80 overflow-y-scroll overflow-hidden shadow-3xl border-2 rounded-md">
			<div className="flex flex-col justify-start items-center">
				<h1 className="m-3 text-center break-all text-2xl">{title}</h1>
				<p className="m-5 text-wrap break-all leading-relaxed">{content}</p>
			</div>
			<p className="m-5">
				by <strong className="text-green-500">{author}</strong>
			</p>
		</div>
	);
}
