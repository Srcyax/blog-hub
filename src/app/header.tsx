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
	const [submit, setSubmit] = useState<boolean>();

	const router = useRouter();

	useEffect(() => {
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
	});

	const handleEditProfile = () => {
		if (!newUsername) return;

		setSubmit(true);

		axios
			.post("/api/profile", {
				userId: parseInt(sessionStorage.getItem("id") as string),
				newUsername: newUsername,
			})
			.then((res) => {
				console.log(res.data);
				toast(res.data.message);
				setSubmit(false);
				setTimeout(() => {
					location.reload();
				}, 1000);
			})
			.catch((error) => {
				toast(error.response.error);
				setSubmit(false);
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
						<SheetTrigger className="hover:opacity-70 transition-all">
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
									<Button onClick={handleEditProfile}>Submit</Button>
									{submit ? (
										<div role="status">
											<svg
												aria-hidden="true"
												className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
												viewBox="0 0 100 101"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
													fill="currentColor"
												/>
												<path
													d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
													fill="currentFill"
												/>
											</svg>
											<span className="sr-only">Loading...</span>
										</div>
									) : null}
								</div>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				) : null}
			</section>
		</header>
	);
}
