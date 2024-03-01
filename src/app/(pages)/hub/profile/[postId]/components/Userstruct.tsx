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
import { handleEditBio } from "../functions/editbio";

type UserProps = {
	id: number;
	username: string;
	bio: string;
};

export default function Userstruct({
	user,
	authenticated,
}: {
	user: UserProps | null | undefined;
	authenticated: boolean;
}) {
	const [editBio, setEditBio] = useState<boolean>(false);
	const [bio, setBio] = useState<string | undefined>();
	const [submit, setSubmit] = useState<boolean>(false);

	return (
		<>
			<div className="flex flex-col gap-2 items-center justify-start border-2 shadow-3xl px-16 py-5 h-64 rounded-md">
				{!user ? (
					<Skeleton className="w-20 h-20 rounded-full" />
				) : (
					<Avatar className="shadow-xl w-20 h-20">
						<AvatarImage src="" />
						<AvatarFallback>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
					</Avatar>
				)}
				<div className="flex flex-col gap-2 items-center">
					{!user ? (
						<div className="flex flex-col gap-2 items-center">
							<Skeleton className="w-16 h-4" />
							<Skeleton className="w-5 h-4" />
						</div>
					) : (
						<div className="flex flex-col gap-2 items-center">
							<h1>{user?.username}</h1>
							<h1>id: {user?.id}</h1>
						</div>
					)}
				</div>
			</div>
			<div className="flex flex-col gap-2 items-center justify-center w-full border-2 shadow-3xl p-5 rounded-md">
				<div className="w-full h-full">
					{!user ? (
						<div className="flex flex-col gap-2">
							<Skeleton className="w-96 smartphone:w-48 h-4" />
							<Skeleton className="w-72 smartphone:w-40 h-4" />
						</div>
					) : (
						<div>
							{!editBio ? (
								<div className="flex gap-2">
									<h1>{user?.bio}</h1>
									{authenticated && user ? (
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
										defaultValue={user?.bio}
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
												toast.promise(handleEditBio(user?.id, bio), {
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
		</>
	);
}
