import { historyApi } from "@/Modules/History/model/api/historyApi.ts";

export const mockHistoryApi = () => {
	return {
		saveRecord: vi.spyOn(historyApi, "saveRecord").mockImplementation(() => {}),
	};
};
