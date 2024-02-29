"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/ui/loading";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Create() {
	const { handleSubmit, register } = useForm();
	const [post, setPost] = useState<boolean>();
	const router = useRouter();

	function onSubmit(data: any) {
		setPost(true);
		axios
			.post("/api/posts", {
				title: data.title,
				content: data.content,
			})
			.then((res) => {
				router.push("/hub");
			})
			.catch((error) => {
				if (error.response) {
					if (error.response.status) {
						toast(
							"(" +
								error.response.status +
								") " +
								error.response.data.error
						);
						setPost(false);
					} else {
						toast("Unable to publish this post");
						setPost(false);
					}
				}
			});
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col justify-center items-center gap-4 shadow-3xl border-2 p-5 rounded-md"
		>
			<Input
				{...register("title")}
				maxLength={25}
				type="text"
				placeholder="Title"
			/>
			<Textarea
				{...register("content")}
				maxLength={255}
				placeholder="Enter your content message here."
			/>
			<Button disabled={post} type="submit" className="mt-10">
				Post
			</Button>
			{post ? <Loading /> : null}
		</form>
	);
}
