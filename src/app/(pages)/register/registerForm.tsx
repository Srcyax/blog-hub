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

export default function RegisterForm() {
	const { handleSubmit, register } = useForm();
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
						toast(
							"(" +
								error.response.status +
								") " +
								error.response.data.error
						);
						setRegister(false);
					}
				} else {
					toast("Error when making requests");
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
