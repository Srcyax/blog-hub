import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PostInfo {
	id: number;
	title: string;
	content: string;
}

export default function EditPost({ id, title, content }: PostInfo) {
	const [newTitle, setNewTitle] = useState<string>();
	const [newContent, setNewContent] = useState<string>();

	const handleEdit = () => {
		const newTitleFormat = newTitle
			?.replace(/[^a-zA-Z0-9 ]/g, "")
			.replace(/\s/g, "");
		const newContentFormat = newContent
			?.replace(/[^a-zA-Z0-9 ]/g, "")
			.replace(/\s/g, "");

		if (!newTitleFormat || !newContentFormat) {
			toast("Unable to edit this post");
			return;
		}

		axios
			.post("/api/posts/edit-post", {
				id: id,
				newTitle: newTitleFormat,
				newContent: newContentFormat,
			})
			.then((res) => {
				toast(res.data.message);
				setTimeout(() => {
					location.reload();
				}, 1000);
			})
			.catch((error) => {
				toast(error.response.error);
			});
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<Pencil
					width={15}
					className="cursor-pointer hover:text-green-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
				/>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<div className="flex flex-col justify-center items-center gap-4 shadow-3xl border-2 p-5 rounded-md">
						<Input
							defaultValue={title}
							maxLength={25}
							onChange={(e) => {
								setNewTitle(e.target.value);
							}}
							type="text"
							placeholder="Title"
						/>
						<Textarea
							defaultValue={content}
							maxLength={255}
							onChange={(e) => {
								setNewContent(e.target.value);
							}}
							placeholder="Enter your content message here."
						/>
					</div>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleEdit}>
						Submit
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
