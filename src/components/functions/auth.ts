import axios from "axios";

export async function Auth() {
	await axios.post("/api/auth", {}).then((res) => {});
}
