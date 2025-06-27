import { historyService } from "@/Modules/History/model/services/historyService.ts";

export function mockHistoryService() {
	return {
		getSavedRecords: vi.spyOn(historyService, "getSavedRecords").mockImplementation(() => []),
		validateRecords: vi.spyOn(historyService, "validateRecords").mockImplementation(() => {}),
		deleteRecord: vi.spyOn(historyService, "deleteRecord").mockImplementation(() => {}),
		clearRecords: vi.spyOn(historyService, "clearRecords").mockImplementation(() => {}),
	};
}
