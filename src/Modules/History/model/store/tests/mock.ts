import { historyActions } from "@/Modules/History/model/store/historyActions.ts";

export function mockHistoryActions() {
	return {
		setRecord: vi.spyOn(historyActions, "setRecord").mockImplementation(() => {}),
		deleteRecord: vi.spyOn(historyActions, "deleteRecord").mockImplementation(vi.fn()),
		clearRecord: vi.spyOn(historyActions, "clearRecords").mockImplementation(vi.fn()),
	};
}
