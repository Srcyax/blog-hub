"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Loading } from "@/components/ui/loading";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterForm() {
	const schema = z.object({
		username: z
			.string()
			.min(3, { message: "* User must contain at least 4 characters" })
			.regex(/^[\x00-\xFF]*$/, { message: "* User should contain only alphabets" })
			.max(10, { message: "* User must contain a maximum of 10 characters" }),
		password: z
			.string()
			.regex(new RegExp("/^[\x00-\xFF]*$/"), {
				message: "* Password should contain only alphabets",
			})
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
	const [isRegister, setRegister] = useState<boolean>();
	const router = useRouter();

	function onSubmit(data: any) {
		setRegister(true);
		axios
			.post("/api/register", {
				username: data.username,
				password: data.password,
			})
			.then((res) => {
				router.push("/login");
			})
			.catch((error) => {
				if (error.response) {
					if (error.response.status) {
						toast.error("(" + error.response.status + ") " + error.response.data.error);
						setRegister(false);
					}
				} else {
					toast.error("Error when making requests");
					console.error("Error when making request:", error.message);
					setRegister(false);
				}
			});
	}

	return (
		<form
			className="flex flex-col justify-center items-center gap-4 shadow-3xl border-2 p-5 rounded-md transition-all duration-200"
			onSubmit={handleSubmit(onSubmit)}
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
			<Button type="submit" disabled={isRegister} className="mt-3">
				Register
			</Button>
			<h1>
				Already have an account?{" "}
				<Link className="hover:underline" href="/login">
					Login
				</Link>
			</h1>
			{isRegister ? <Loading /> : null}
		</form>
	);
}
