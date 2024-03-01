"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import CommentArea from "./components/CommentArea";
import Userstruct from "./components/Userstruct";

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

export default function Page({ params }: any) {
	const [authenticated, setAuthenticated] = useState<boolean>(false);

	const [profileUser, setProfileUser] = useState<UserProps | null>();
	const [user, setUser] = useState<UserProps | null>();

	const router = useRouter();

	useEffect(() => {
		axios
			.post("/api/profile", {
				id: parseInt(params.postId),
			})
			.then((res) => {
				setProfileUser(res.data.user);
				return res.data.json();
			})
			.catch((error) => {
				if (error.response.status === 404) {
					router.push("/404");
				}
			});
	});

	useEffect(() => {
		axios
			.post("/api/profile/auth", {
				id: profileUser?.id,
			})
			.then((res) => {
				setAuthenticated(res.data);
			})
			.catch((error) => {
				toast.error(error.response.data.error);
			});

		axios
			.post("/api/profile/getusername")
			.then((res) => {
				setUser(res.data.user);
			})
			.catch((error) => {
				console.log();
			});
	}, []);

	return (
		<div>
			<main className="m-16 flex flex-col gap-5">
				<div>
					<Button
						className="h-9"
						onClick={() => {
							router.push("/hub");
						}}
					>
						<Undo2 />
					</Button>
				</div>
				<div className="flex laptop:flex-row tablet:flex-col smartphone:flex-col gap-2 smartphone:gap-4 w-full">
					<Userstruct user={profileUser} authenticated={authenticated} />
				</div>

				<CommentArea user={user} id={profileUser?.id} />
				{profileUser &&
					profileUser.comment &&
					profileUser.comment.toReversed().map((comment, index) => (
						<div key={index} className="flex gap-4 items-center border-2 shadow-3xl p-5 rounded-md">
							<div className="">
								{!profileUser ? (
									<Skeleton className="w-12 h-12 rounded-full" />
								) : (
									<Avatar className="shadow-xl w-12 h-12">
										<AvatarImage src="" />
										<AvatarFallback>{comment?.author.charAt(0).toUpperCase()}</AvatarFallback>
									</Avatar>
								)}
							</div>

							<div>
								<h1>{comment.content}</h1>
							</div>
						</div>
					))}
			</main>
		</div>
	);
}
