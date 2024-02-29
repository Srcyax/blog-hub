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

export default function LoginForm() {
	const { handleSubmit, register } = useForm();
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
						toast(
							"(" +
								error.response.status +
								") " +
								error.response.data.error
						);
						setLogin(false);
					}
				} else {
					toast("Error when making requests");
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
			<Input
				{...register("username")}
				maxLength={10}
				type="text"
				placeholder="Username"
			/>
			<Input
				{...register("password")}
				maxLength={24}
				type="password"
				placeholder="Password"
			/>
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
