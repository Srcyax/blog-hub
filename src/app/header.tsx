"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { trpc } from "./_trpc/client";

export default function Header() {
	const getUser = trpc.getUser.useQuery();
	const user = getUser.data?.response;

	const router = useRouter();

	return (
		<header className="flex justify-between items-center p-5 border-2 shadow-lg">
			<Link href="/">
				<h1 className="text-2xl font-bold">
					Blog
					<strong className="text-green-500">Hub</strong>
				</h1>
			</Link>
			<section className="flex gap-4">
				{user ? (
					<Button
						variant="outline"
						className="px-5 hover:px-6 py-2 rounded-md shadow-3xl transition-all"
						onClick={() => {
							router.push("/post");
						}}
					>
						Publish
					</Button>
				) : null}

				{!user?.username && getUser.isFetched ? (
					<Button
						className="px-5 hover:px-6 py-2 rounded-md shadow-3xl transition-all"
						onClick={() => {
							router.push("/login");
						}}
					>
						Login
					</Button>
				) : (
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Avatar className="shadow-xl">
								<AvatarImage src="" />
								<AvatarFallback>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => {
									if (user?.username) router.push(`/hub/profile/${user?.id}`);
								}}
							>
								Profile
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									if (!user?.username) return;
									axios.get("api/logout").then(() => {
										location.reload();
									});
								}}
							>
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</section>
		</header>
	);
}
