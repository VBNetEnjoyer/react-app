import { $api } from "@/Shared/api/$api.ts";

export const generationApi = {
	async generateFile() {
		return new Promise(async (res, rej) => {
			try {
				await $api.downloadFile("/report", { withErrors: "off", maxSpend: 1000, size: 0.1 });
				res("");
			} catch (error) {
				console.error(error);
				rej();
			}
		});
	},
};
