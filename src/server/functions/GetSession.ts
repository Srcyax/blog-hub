import { cookies } from "next/headers";

export async function Session() {
	var hasToken = cookies().has("acess_token");

	if (!hasToken) {
		return { error: "Not allowed" };
	}

	return true;
}
