import axios from "axios";
import { Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface PostInfo {
	id: number;
	title: string;
	content: string;
	author: string;
}

export default function BlogPost({ id, title, content, author }: PostInfo) {
	const [newTitle, setNewTitle] = useState<string>();
	const [newContent, setNewContent] = useState<string>();

	return (
		<div className="group flex flex-col justify-between m-5 w-72 h-80 overflow-y-auto overflow-hidden shadow-3xl border-2 rounded-md">
			<div className="flex flex-col justify-start items-center">
				<h1 className="m-3 text-center break-all text-2xl">{title}</h1>
				<p className="m-5 text-wrap break-all leading-relaxed">
					{content}
				</p>
			</div>
			<p className="m-5">
				{sessionStorage.getItem("user")?.toString() === author ? (
					<div className="flex flex-row gap-2">
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
										This action cannot be undone. This will
										permanently delete your post and remove
										data from our servers.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>
										Cancel
									</AlertDialogCancel>
									<AlertDialogAction
										onClick={() => {
											axios
												.post("api/posts/delete-post", {
													id: id,
													title: title,
												})
												.then((res) => {
													toast(res.data.message);
													setTimeout(() => {
														location.reload();
													}, 1000);
												})
												.catch((error) => {
													if (error.response) {
														toast(
															error.response.data
																.error
														);
													}
												});
										}}
									>
										Continue
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>

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
									<AlertDialogCancel>
										Cancel
									</AlertDialogCancel>
									<AlertDialogAction
										onClick={() => {
											axios
												.post("/api/posts/edit-post", {
													id: id,
													title: title,
													newTitle: newTitle,
													newContent: newContent,
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
										}}
									>
										Submit
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				) : null}
				by <strong className="text-green-500">{author}</strong>
			</p>
		</div>
	);
}
function usestate<T>(): [any, any] {
	throw new Error("Function not implemented.");
}
