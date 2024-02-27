"use client";
import { Button } from "@/components/ui/button";
import { CornerDownRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	return (
		<main className="h-full">
			<div className="flex flex-col gap-6 justify-center items-center mt-40">
				<div className="text-center">
					<h1 className="text-6xl mb-3">
						Welcome to <strong>Blog</strong>{" "}
						<strong className="text-green-500">Hub</strong>
					</h1>
					<p>Discover, Learn, Grow: Your Pathway to Inspiration!</p>
				</div>
				<Button
					onClick={() => {
						router.push("/hub");
					}}
					className="flex gap-2 items-center hover:gap-4 transition-all duration-200"
				>
					Discover <CornerDownRight width={15} />
				</Button>
			</div>
		</main>
	);
}
