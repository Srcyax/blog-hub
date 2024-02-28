import RegisterForm from "./registerForm";

export default function Register() {
	return (
		<main className="flex flex-col justify-center items-center mt-40">
			<h1 className="m-5 text-3xl font-semibold">Register</h1>
			<RegisterForm />
		</main>
	);
}
