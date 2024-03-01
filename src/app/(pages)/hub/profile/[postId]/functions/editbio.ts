import axios from "axios";
import { toast } from "sonner";

export async function handleEditBio(id: number, bio: string | null | undefined) {
	await axios
		.post("/api/profile/updateBio", {
			id: id,
			bio: bio,
		})
		.then((res) => {})
		.catch((error) => {
			toast.error(error.response.data.error);
		});
}
