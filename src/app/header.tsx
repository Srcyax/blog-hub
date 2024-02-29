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
import { LogOut } from "lucide-react";
import { handleEditProfile } from "./(pages)/hub/profile/updateProfile";
import { Loading } from "@/components/ui/loading";

export default function Header() {
	const [username, setUsername] = useState<string>();
	const [submit, setSubmit] = useState<boolean>(false);
	const [getUser, setGetUser] = useState<boolean>(true);
	const [newUsername, setNewUsername] = useState<string>();

	const router = useRouter();

	useEffect(() => {
		if (getUser) {
			axios
				.post("/api/profile/getusername")
				.then((res) => {
					setUsername(res.data.user.username);
					setGetUser(false);
				})
				.catch((error) => {
					setGetUser(false);
				});
		}
	});

	return (
		<header className="flex justify-between items-center p-5 border-2 shadow-lg">
			<Link href="/">
				<h1 className="text-2xl font-bold">
					Blog
					<strong className="text-green-500">Hub</strong>
				</h1>
			</Link>
			<section className="flex gap-4">
				{username ? (
					<Button
						disabled={submit}
						variant="outline"
						className="px-5 hover:px-6 py-2 rounded-md shadow-3xl transition-all"
						onClick={() => {
							if (sessionStorage.getItem("id")) {
								router.push("/post");
							} else {
								router.push("/login");
							}
						}}
					>
						Publish
					</Button>
				) : null}

				{!username && !getUser ? (
					<Button
						className="px-5 hover:px-6 py-2 rounded-md shadow-3xl transition-all"
						onClick={() => {
							router.push("/login");
						}}
					>
						Login
					</Button>
				) : (
					<Sheet>
						<SheetTrigger className="hover:opacity-70 transition-all">
							<Avatar className="shadow-xl">
								<AvatarImage src="" />
								<AvatarFallback>
									{username?.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
						</SheetTrigger>
						<SheetContent className="w-[400px] sm:w-[540px]">
							<SheetHeader>
								<SheetTitle>Edit profile</SheetTitle>
							</SheetHeader>
							<SheetFooter className="flex flex-col justify-between items-center">
								<div className="flex flex-col items-center gap-4 m-9">
									<Input
										maxLength={25}
										defaultValue={username}
										onChange={(e) => {
											setNewUsername(e.target.value);
										}}
										type="text"
										placeholder="Username"
									/>
									<Input
										maxLength={25}
										disabled={true}
										type="text"
										placeholder="Url image"
									/>
									<Button
										onClick={() => {
											setSubmit(true);
											handleEditProfile(
												newUsername as string
											).then(() => {
												setSubmit(false);
											});
										}}
									>
										Submit
									</Button>
									{submit ? <Loading /> : null}
								</div>
								<div className="absolute bottom-2">
									<Button
										className="flex gap-3"
										onClick={() => {
											axios.get("api/logout").then(() => {
												location.reload();
											});
										}}
									>
										Log out <LogOut />
									</Button>
								</div>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				)}
			</section>
		</header>
	);
}
