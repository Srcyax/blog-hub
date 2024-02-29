"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil, Undo2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type UserProps = {
	id: number;
	username: string;
};

export default function Page({ params }: any) {
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
			})
			.catch((error) => {
				if (error.response.status === 404) {
					router.push("/404");
				}
			});

		axios
			.post("/api/profile/getusername")
			.then((res) => {
				setUser(res.data.user);
			})
			.catch((error) => {
				console.log();
			});
	});
	return (
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

			<div className="flex gap-2 w-full">
				<div className="flex flex-col gap-2 items-center justify-start border-2 shadow-3xl px-16 py-5 h-64 rounded-md">
					{!profileUser ? (
						<Skeleton className="w-20 h-20 rounded-full" />
					) : (
						<Avatar className="shadow-xl w-20 h-20">
							<AvatarImage src="" />
							<AvatarFallback>
								{profileUser?.username?.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
					)}
					<div className="flex flex-col gap-2 items-center">
						{!profileUser ? (
							<div className="flex flex-col gap-2 items-center">
								<Skeleton className="w-16 h-4" />
								<Skeleton className="w-5 h-4" />
							</div>
						) : (
							<div className="flex flex-col gap-2 items-center">
								<h1>{profileUser?.username}</h1>
								<h1>{profileUser?.id}</h1>
							</div>
						)}
						<div>{profileUser ? <Pencil width={15} /> : null}</div>
					</div>
				</div>
				<div className="flex flex-col gap-2 items-center justify-center w-full border-2 shadow-3xl p-5 rounded-md">
					<div className="w-full h-full">
						{!profileUser ? (
							<div className="flex flex-col gap-2">
								<Skeleton className="w-96 h-4" />
								<Skeleton className="w-72 h-4" />
							</div>
						) : (
							<h1>Bio</h1>
						)}
					</div>
				</div>
			</div>
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
				<div className="flex flex-col gap-2 items-center justify-center w-full p-2">
					<Textarea disabled={!user} className="resize-none" placeholder="Comment" />
				</div>
			</div>
		</main>
	);
}
