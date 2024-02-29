import axios from "axios";
import { toast } from "sonner";

export async function handleEditProfile(newUsername: string) {
	if (!newUsername) return;

	await axios
		.post("/api/profile", {
			newUsername: newUsername,
		})
		.then((res) => {
			toast(res.data.message);
			setTimeout(() => {
				location.reload();
			}, 1000);
		})
		.catch((error) => {
			toast(error.response.data.error);
		});
}
