import { Trash2, Pencil } from "lucide-react";

interface PostInfo {
	title: string;
	content: string;
	author: string;
}

export default function BlogPost({ title, content, author }: PostInfo) {
	return (
		<div className="group flex flex-col justify-between m-5 w-72 h-80 overflow-y-auto overflow-hidden shadow-3xl border-2 rounded-md">
			<div className="flex flex-col justify-start items-center">
				<h1 className="m-3 text-center break-all text-2xl">{title}</h1>
				<p className="m-5 text-wrap break-all leading-relaxed">{content}</p>
			</div>
			<p className="m-5">
				{sessionStorage.getItem("user")?.toString() === author ? (
					<div className="flex flex-row gap-2">
						<Trash2
							width={15}
							className="cursor-pointer hover:text-green-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
						/>
						<Pencil
							width={15}
							className="cursor-pointer hover:text-green-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
						/>
					</div>
				) : null}
				by <strong className="text-green-500">{author}</strong>
			</p>
		</div>
	);
}
