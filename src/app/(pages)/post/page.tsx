import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Post() {
	return (
		<main className="flex flex-col justify-center items-center">
			<h1 className="m-5 text-3xl font-semibold">Create Post</h1>
			<div className="flex flex-col justify-center items-center gap-4 shadow-3xl border-2 p-5 rounded-md">
				<Input type="text" placeholder="Title" />
				<Textarea placeholder="Enter your content message here." />
				<Button className="mt-10">Create</Button>
			</div>
		</main>
	);
}
