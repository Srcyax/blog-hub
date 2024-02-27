import { Button } from "@/components/ui/button";
import RegisterForm from "./registerForm";

export default function Register() {
	return (
		<main className="flex flex-col justify-center items-center mt-40">
			<h1 className="m-5 text-3xl font-semibold">Register</h1>
			<div className="flex flex-col justify-center items-center gap-4 shadow-3xl border-2 p-5 rounded-md transition-all duration-200">
				<RegisterForm />
			</div>
		</main>
	);
}
