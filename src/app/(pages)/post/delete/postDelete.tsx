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
import { Button } from "@/components/ui/button";

interface PostInfo {
	id: number;
}

export default function DeletePost({ id }: PostInfo) {
	const handleDelete = () => {
		axios
			.post("api/posts/delete-post", {
				id: id,
			})
			.then((res) => {
				setTimeout(() => {
					location.reload();
				}, 300);
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
					<AlertDialogTitle>
						Are you absolutely sure?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently
						delete your post and remove data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<form onSubmit={handleDelete} action="">
						<div className="flex flex-col gap-2 items-center">
							<AlertDialogCancel className="px-44">
								Cancel
							</AlertDialogCancel>
							<Button className="px-44">Continue</Button>
						</div>
					</form>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
