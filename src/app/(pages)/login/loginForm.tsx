"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Loading } from "@/components/ui/loading";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
	const schema = z.object({
		username: z
			.string()
			.min(3, { message: "* User must contain at least 3 characters" })
			.regex(/^[\x00-\xFF]*$/, { message: "* User should contain only alphabets" })
			.max(10, { message: "* User must contain a maximum of 10 characters" }),
		password: z
			.string()
			.min(4, { message: "* Password must contain at least 4 characters" })
			.regex(/^[\x00-\xFF]*$/, { message: "* Password should contain only alphabets" })
			.max(24, { message: "* Password must contain a maximum of 24 characters" }),
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
	});

	const [login, setLogin] = useState<boolean>();
	const router = useRouter();

	function onSubmit(data: any) {
		setLogin(true);
		axios
			.post("/api/login", {
				username: data.username,
				password: data.password,
			})
			.then((res) => {
				router.push("/hub");
			})
			.catch((error) => {
				if (error.response) {
					if (error.response.status) {
						toast.error("(" + error.response.status + ") " + error.response.data.error);
						setLogin(false);
					}
				} else {
					toast.error("Error when making requests");
					console.error("Error when making request:", error.message);
					setLogin(false);
				}
			});
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			action=""
			className="flex flex-col justify-center items-center gap-4 shadow-3xl border-2 p-5 rounded-md transition-all duration-200"
		>
			<div className="items-center w-full">
				<Input {...register("username")} maxLength={10} type="text" placeholder="Username" />
				{errors.username?.message && (
					<p className="my-1 text-[12px] text-red-500">{errors.username?.message as string}</p>
				)}
			</div>
			<div className="items-center w-full">
				<Input {...register("password")} maxLength={24} type="password" placeholder="Password" />
				{errors.password?.message && (
					<p className="my-1 text-[12px] text-red-500">{errors.password?.message as string}</p>
				)}
			</div>

			<Button type="submit" disabled={login} className="mt-3">
				Log in
			</Button>
			<h1>
				Dont have an account?{" "}
				<Link className="hover:underline" href="/register">
					Register
				</Link>
			</h1>
			{login ? <Loading /> : null}
		</form>
	);
}
