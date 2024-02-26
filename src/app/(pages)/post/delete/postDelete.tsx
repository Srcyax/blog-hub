import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

interface PostInfo {
	id: number;
}

export default function DeletePost({ id }: PostInfo) {
	const handleDelete = () => {
		axios
			.post("api/posts/delete-post", {
				id: id,
				userId: parseInt(sessionStorage.getItem("id") as string),
			})
			.then((res) => {
				toast(res.data.message);
				setTimeout(() => {
					location.reload();
				}, 1000);
			})
			.catch((error) => {
				toast(error.response.data.error);
			});
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<Trash2
					width={15}
					className="cursor-pointer hover:text-green-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
				/>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your post and
						remove data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
