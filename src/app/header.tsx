"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
	const [username, setUsername] = useState<string>();
	const router = useRouter();
	useEffect(() => {
		setUsername(localStorage.getItem("user") ?? undefined);
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
				<button
					onClick={() => {
						if (localStorage.getItem("user")) {
							router.push("/post");
						} else {
							router.push("/register");
						}
					}}
					className="px-5 hover:px-6 py-2 rounded-md shadow-3xl transition-all"
				>
					Create post
				</button>
				{username ? (
					<Avatar className="shadow-xl">
						<AvatarImage src="" />
						<AvatarFallback>
							{username?.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				) : null}
			</section>
		</header>
	);
}
