"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type UserProps = {
	id: number;
	username: string;
};

export default function Page({ params }: any) {
	const [user, setUser] = useState<UserProps | null>();

	const router = useRouter();
	useEffect(() => {
		axios
			.post("/api/profile", {
				id: parseInt(params.postId),
			})
			.then((res) => {
				setUser(res.data.user);
			})
			.catch((error) => {
				if (error.response.status === 404) {
					router.push("/404");
				}
			});
	});
	return <main></main>;
}
