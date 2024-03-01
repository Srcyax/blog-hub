import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Send } from "lucide-react";
import { useState } from "react";

type CommentsProps = {
	id: number;
	title: string;
	content: string;
	author: string;
	authorId: number;
};

type UserProps = {
	id: number;
	username: string;
	bio: string;
	comment: CommentsProps[];
};

export default function CommentArea({
	user,
	id,
}: {
	user: UserProps | null | undefined;
	id: number | null | undefined;
}) {
	const [submit, setSubmit] = useState<boolean>(false);
	const [content, setContent] = useState<string>();

	const handleComment = () => {
		setSubmit(true);
		axios
			.post("/api/posts/comments", {
				content: content,
				id: id,
			})
			.then((res) => {
				setSubmit(false);
				setContent("");
			})
			.catch((error) => {
				console.log(error);
				setSubmit(false);
			});
	};

	return (
		<div className="flex gap-2 items-center border-2 shadow-3xl p-5 rounded-md">
			<div className="">
				{!user ? (
					<Skeleton className="w-12 h-12 rounded-full" />
				) : (
					<Avatar className="shadow-xl w-12 h-12">
						<AvatarImage src="" />
						<AvatarFallback>{user?.username.charAt(0).toUpperCase()}</AvatarFallback>
					</Avatar>
				)}
			</div>

			<div className="flex gap-4 items-center justify-center w-full p-2">
				<Textarea
					onChange={(e) => {
						setContent(e.target.value);
					}}
					disabled={!user}
					className="resize-none"
					placeholder="Comment"
				/>
				<Button onClick={handleComment} disabled={submit || !user || !content}>
					<Send width={15} />
				</Button>
			</div>
		</div>
	);
}
