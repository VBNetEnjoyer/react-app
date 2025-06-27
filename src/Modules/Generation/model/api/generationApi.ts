import { $api } from "@/Shared/api/$api.ts";

export const generationApi = {
	async generateFile() {
		return $api.downloadFile("/report", { withErrors: "off", maxSpend: 1000, size: 0.1 });
	},
};
