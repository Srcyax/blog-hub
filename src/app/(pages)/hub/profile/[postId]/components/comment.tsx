import { Button } from "@/components/ui/button";
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

export default function CommentArea({ user }: { user: UserProps | null | undefined }) {
	const [submit, setSubmit] = useState<boolean>(false);
	const [content, setContent] = useState<string>();

	const handleComment = () => {
		setSubmit(true);
		axios
			.post("/api/posts/comments", {
				content: content,
				id: user?.id,
			})
			.then((res) => {
				console.log(res.data);
				setSubmit(false);
			})
			.catch((error) => {
				console.log(error);
				setSubmit(false);
			});
	};

	return (
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
	);
}
