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
import Content from "./postContent";
import DeletePost from "./delete/postDelete";
import EditPost from "./edit/postEdit";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostInfo {
	id: number;
	title: string;
	content: string;
	author: string;
	authorId: number;
}

export default function BlogPost({
	id,
	title,
	content,
	author,
	authorId,
}: PostInfo) {
	return (
		<div className="group flex flex-col justify-between m-5 w-72 h-80 overflow-y-auto overflow-hidden shadow-3xl border-2 rounded-md hover:border-green-500 transition-colors duration-150">
			<Content title={title} content={content} />

			<p className="m-5">
				<div className="flex gap-2 items-center">
					<Avatar className="shadow-xl">
						<AvatarImage src="" />
						<AvatarFallback>
							{author?.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<strong className="text-green-500">{author}</strong>
					{parseInt(sessionStorage.getItem("id") as string) ===
					authorId ? (
						<div className="flex flex-row gap-2 items-center m-1">
							<DeletePost id={id} />
							<EditPost id={id} title={title} content={content} />
						</div>
					) : null}
				</div>
			</p>
		</div>
	);
}
