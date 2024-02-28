import axios from "axios";
import { toast } from "sonner";

export async function handleEditProfile(newUsername: string) {
	if (!newUsername) return;

	await axios
		.post("/api/profile", {
			userId: parseInt(sessionStorage.getItem("id") as string),
			newUsername: newUsername,
		})
		.then((res) => {
			console.log(res.data);
			toast(res.data.message);
			setTimeout(() => {
				location.reload();
			}, 1000);
		})
		.catch((error) => {
			toast(error.response.data.error);
		});
}
