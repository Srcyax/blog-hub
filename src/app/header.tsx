"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export default function Header() {
	const router = useRouter();
	return (
		<header className="flex justify-between items-center p-5 border-2 shadow-lg">
			<h1 className="text-2xl font-bold">
				Blog
				<strong className="text-green-500">Hub</strong>
			</h1>
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
				<Avatar className="shadow-xl">
					<AvatarImage src="" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</section>
		</header>
	);
}
