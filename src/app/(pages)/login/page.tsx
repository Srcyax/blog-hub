"use client";

import LoginForm from "./loginForm";

export default function Login() {
	return (
		<main className="flex flex-col justify-center items-center">
			<h1 className="m-5 text-3xl font-semibold">Log in</h1>
			<div className="flex flex-col justify-center items-center gap-4 shadow-3xl border-2 p-5 rounded-md transition-all duration-200">
				<LoginForm />
			</div>
		</main>
	);
}
