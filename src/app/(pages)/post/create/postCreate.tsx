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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Create() {
	const schema = z.object({
		title: z
			.string()
			.min(2, { message: "* Title must contain at least 2 characters" })
			.regex(/^[\x00-\xFF]*$/, { message: "* Title should contain only alphabets" })
			.max(10, { message: "* Title must contain a maximum of 10 characters" }),
		content: z
			.string()
			.min(2, { message: "* Content must contain at least 2 characters" })
			.regex(/^[\x00-\xFF]*$/, { message: "* Content should contain only alphabets" })
			.max(255, { message: "* Content must contain a maximum of 255 characters" }),
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
	});

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
						toast.error("(" + error.response.status + ") " + error.response.data.error);
						setPost(false);
					} else {
						toast.error("Unable to publish this post");
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
			<div className="w-full">
				<Input {...register("title")} maxLength={25} type="text" placeholder="Title" />
				{errors.title?.message && (
					<p className="my-1 text-[12px] text-red-500">{errors.title?.message as string}</p>
				)}
			</div>
			<div className="w-full">
				<Textarea
					{...register("content")}
					maxLength={255}
					className="resize-none"
					placeholder="Enter your content message here."
				/>
				{errors.content?.message && (
					<p className="my-1 text-[12px] text-red-500">{errors.content?.message as string}</p>
				)}
			</div>
			<Button disabled={post} type="submit" className="mt-10">
				Post
			</Button>
			{post ? <Loading /> : null}
		</form>
	);
}
