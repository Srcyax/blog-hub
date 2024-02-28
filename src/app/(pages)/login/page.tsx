"use client";

import LoginForm from "./loginForm";

export default function Login() {
	return (
		<main className="flex flex-col justify-center items-center mt-40">
			<h1 className="m-5 text-3xl font-semibold">Log in</h1>
			<LoginForm />
		</main>
	);
}
