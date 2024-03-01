"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil, Send, Undo2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { toast } from "sonner";

import CommentArea from "./components/comment";

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

	const [bio, setBio] = useState<string | undefined>();
	const [editBio, setEditBio] = useState<boolean>(false);

	const [submit, setSubmit] = useState<boolean>(false);

	const router = useRouter();

	useEffect(() => {
		console.log(profileUser?.comment);
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
			.post("/api/profile", {
				id: parseInt(params.postId),
			})
			.then((res) => {
				console.log(res.data.user);
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

	async function handleEditBio() {
		await axios
			.post("/api/profile/updateBio", {
				id: profileUser?.id,
				bio: bio,
			})
			.then((res) => {})
			.catch((error) => {
				toast.error(error.response.data.error);
			});
	}

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
					<div className="flex flex-col gap-2 items-center justify-start border-2 shadow-3xl px-16 py-5 h-64 rounded-md">
						{!profileUser ? (
							<Skeleton className="w-20 h-20 rounded-full" />
						) : (
							<Avatar className="shadow-xl w-20 h-20">
								<AvatarImage src="" />
								<AvatarFallback>{profileUser?.username?.charAt(0).toUpperCase()}</AvatarFallback>
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
									<h1>id: {profileUser?.id}</h1>
								</div>
							)}
						</div>
					</div>
					<div className="flex flex-col gap-2 items-center justify-center w-full border-2 shadow-3xl p-5 rounded-md">
						<div className="w-full h-full">
							{!profileUser ? (
								<div className="flex flex-col gap-2">
									<Skeleton className="w-96 smartphone:w-48 h-4" />
									<Skeleton className="w-72 smartphone:w-40 h-4" />
								</div>
							) : (
								<div>
									{!editBio ? (
										<div className="flex gap-2">
											<h1>{profileUser?.bio}</h1>
											{authenticated && profileUser ? (
												<button
													onClick={() => {
														setEditBio(true);
													}}
												>
													<Pencil width={15} />
												</button>
											) : null}
										</div>
									) : (
										<div className="flex flex-col gap-2">
											<Textarea
												defaultValue={profileUser?.bio}
												onChange={(e) => {
													setBio(e.target.value);
												}}
												disabled={!user}
												className="resize-none"
												placeholder="Comment"
											/>
											<div className="flex gap-2 items-center">
												<Button
													disabled={submit}
													onClick={() => {
														setSubmit(true);
														toast.promise(handleEditBio(), {
															loading: "Updating bio...",
															success: (data) => {
																setSubmit(false);
																setEditBio(false);
																return "Bio changed successfully";
															},
															error: () => {
																setSubmit(false);
																setEditBio(false);
																return "Error changing bio";
															},
														});
													}}
												>
													<Send width={15} />
												</Button>
												<Button
													disabled={submit}
													onClick={() => {
														setEditBio(false);
													}}
												>
													Cancel
												</Button>
												{submit ? <Loading /> : null}
											</div>
										</div>
									)}
								</div>
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

					<CommentArea user={profileUser} />
				</div>
				{profileUser &&
					profileUser.comment &&
					profileUser.comment.toReversed().map((comment, index) => (
						<div key={index} className="flex gap-4 items-center border-2 shadow-3xl p-5 rounded-md">
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

							<div>
								<h1>{comment.content}</h1>
							</div>
						</div>
					))}
			</main>
		</div>
	);
}
