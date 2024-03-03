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
import { trpc } from "@/app/_trpc/client";

export default function Page({ params }: any) {
	const getUserProflie = trpc.getUserProfile.useQuery({
		id: parseInt(params.postId),
	});
	const getUser = trpc.getUser.useQuery();

	const [authenticated, setAuthenticated] = useState<boolean>(false);

	const userProfile = getUserProflie?.data?.response;
	const user = getUser?.data?.response;

	const router = useRouter();

	useEffect(() => {
		setAuthenticated(userProfile?.id === user?.id);
	}, [authenticated, getUserProflie.status, user?.id, userProfile?.id]);

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
					<Userstruct user={userProfile} authenticated={authenticated} />
				</div>

				<CommentArea user={user} id={userProfile?.id} />
				{userProfile &&
					userProfile.comment &&
					userProfile.comment.toReversed().map((comment, index) => (
						<div key={index} className="flex gap-4 items-center border-2 shadow-3xl p-5 rounded-md">
							<div className="">
								{!userProfile ? (
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
