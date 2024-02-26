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
		<div className="group flex flex-col justify-between m-5 w-72 h-80 overflow-y-auto overflow-hidden shadow-3xl border-2 rounded-md">
			<Content title={title} content={content} />

			<p className="m-5">
				{parseInt(sessionStorage.getItem("id") as string) === authorId ? (
					<div className="flex flex-row gap-2">
						<DeletePost id={id} />
						<EditPost id={id} title={title} content={content} />
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
