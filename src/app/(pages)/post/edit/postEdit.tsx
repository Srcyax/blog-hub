import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/ui/loading";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type PostInfo = {
	id: number;
	title: string;
	content: string;
};

export default function EditPost(info: PostInfo) {
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

	const [edited, setEdited] = useState<boolean>(false);

	function onSubmit(data: any) {
		setEdited(true);
		axios
			.post("/api/posts/edit-post", {
				id: info.id,
				title: data.title,
				content: data.content,
			})
			.then((res) => {
				toast(res.data.message);
				setEdited(false);
				setTimeout(() => {
					location.reload();
				}, 1000);
			})
			.catch((error) => {
				toast.error(error.response.data.error);
				setEdited(false);
			});
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<Pencil
					width={15}
					className="cursor-pointer hover:text-green-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
				/>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col justify-center items-center gap-4 p-5 rounded-md">
							<div className="w-full">
								<Input
									{...register("title")}
									defaultValue={info.title}
									maxLength={25}
									type="text"
									placeholder="Title"
								/>
								{errors.title?.message && (
									<p className="my-1 text-[12px] text-red-500">{errors.title?.message as string}</p>
								)}
							</div>
							<div className="w-full">
								<Textarea
									{...register("content")}
									defaultValue={info.content}
									maxLength={255}
									className="resize-none"
									placeholder="Enter your content message here."
								/>
								{errors.content?.message && (
									<p className="my-1 text-[12px] text-red-500">{errors.content?.message as string}</p>
								)}
							</div>
							<div className="flex flex-col gap-2 items-center">
								<Button disabled={edited} className="px-44" type="submit">
									Submit
								</Button>
								<AlertDialogCancel disabled={edited} className="px-44">
									Cancel
								</AlertDialogCancel>
								{edited ? <Loading /> : null}
							</div>
						</div>
					</form>
				</AlertDialogHeader>
			</AlertDialogContent>
		</AlertDialog>
	);
}
