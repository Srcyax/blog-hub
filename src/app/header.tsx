"use client";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";

export default function Header() {
	const [username, setUsername] = useState<string>();
	const [newUsername, setNewUsername] = useState<string>();
	const router = useRouter();

	const handleEditProfile = () => {
		axios
			.post("/api/profile", {
				userId: parseInt(sessionStorage.getItem("id") as string),
				newUsername: newUsername,
			})
			.then((res) => {
				console.log(res.data);
				toast(res.data.message);
				setTimeout(() => {
					location.reload();
				}, 1000);
			})
			.catch((error) => {
				toast(error.response.error);
			});
	};

	return (
		<header className="flex justify-between items-center p-5 border-2 shadow-lg">
			<Link href="/">
				<h1 className="text-2xl font-bold">
					Blog
					<strong className="text-green-500">Hub</strong>
				</h1>
			</Link>
			<section className="flex gap-4">
				<button
					onClick={() => {
						if (sessionStorage.getItem("id")) {
							router.push("/post");
						} else {
							router.push("/login");
						}
					}}
					className="px-5 hover:px-6 py-2 rounded-md shadow-3xl transition-all"
				>
					Create post
				</button>
				{username ? (
					<Sheet>
						<SheetTrigger
							onClick={() => {
								axios
									.post("/api/profile/getusername", {
										userId: parseInt(sessionStorage.getItem("id") as string),
									})
									.then((res) => {
										setUsername(res.data.user.username);
									})
									.catch((error) => {
										toast(`${error.status} ${error}`);
									});
							}}
							className="hover:opacity-70 transition-all"
						>
							<Avatar className="shadow-xl">
								<AvatarImage src="" />
								<AvatarFallback>{username?.charAt(0).toUpperCase()}</AvatarFallback>
							</Avatar>
						</SheetTrigger>
						<SheetContent className="w-[400px] sm:w-[540px]">
							<SheetHeader>
								<SheetTitle>Edit profile</SheetTitle>
							</SheetHeader>
							<SheetFooter>
								<div className="flex flex-col gap-4 m-9">
									<Input
										maxLength={25}
										defaultValue={username}
										onChange={(e) => {
											setNewUsername(e.target.value);
										}}
										type="text"
										placeholder="Username"
									/>
									<Input maxLength={25} type="text" placeholder="Url image" />
									<Button onClick={handleEditProfile}>Submit</Button>
								</div>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				) : null}
			</section>
		</header>
	);
}
