export default function Content({
	title,
	content,
}: {
	title: string;
	content: string;
}) {
	return (
		<div className="flex flex-col justify-start items-center">
			<h1 className="m-3 text-center break-all text-2xl">{title}</h1>
			<p className="m-5 text-wrap break-all leading-relaxed">{content}</p>
		</div>
	);
}
