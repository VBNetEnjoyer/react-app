import { historyService } from "../historyService.ts";
import { historyApi } from "../../api/historyApi.ts";
import { useHistoryStore } from "../../store/historyStore.ts";
import { historyActions } from "../../store/historyActions.ts";
import { getSavedRecords } from "@/Modules/Analytics";
import type { AnalyticsRecord } from "@/Modules/Analytics";
import type { AppId } from "@/Shared/types";
import { beforeEach, type Mock } from "vitest";
import { mockHistoryActions } from "@/Modules/History/model/store/tests/mock.ts";
import { mockHistoryApi } from "@/Modules/History/model/api/tests/mock.ts";

// Мокаем всё необходимое
vi.mock("@/Modules/Analytics", async () => {
	const actual = await vi.importActual<typeof import("@/Modules/Analytics")>("@/Modules/Analytics");
	return {
		...actual,
		getSavedRecords: vi.fn(),
	};
});

const mockRecord: AnalyticsRecord = {
	id: "r-001" as AppId,
	fileName: "galaxy.csv",
	date: new Date("2025-06-26"),
	isSuccess: true,
};

describe("HistoryService", () => {
	beforeEach(() => {
		mockHistoryActions();
		mockHistoryApi();
	});

	it("getSavedRecords() возвращает результат analytics.getSavedRecords()", () => {
		(getSavedRecords as Mock).mockReturnValue([mockRecord]);

		const result = historyService.getSavedRecords();
		expect(result).toEqual([mockRecord]);
		expect(getSavedRecords).toHaveBeenCalled();
	});

	it("validateRecords() вызывает historyActions.setRecord с данными из localStorage", () => {
		(getSavedRecords as Mock).mockReturnValue([mockRecord]);

		historyService.validateRecords();

		expect(getSavedRecords).toHaveBeenCalled();
		expect(historyActions.setRecord).toHaveBeenCalledWith([mockRecord]);
	});

	it("deleteRecord() вызывает deleteRecord и saveRecord", () => {
		useHistoryStore.setState(() => ({ records: [mockRecord] }));

		historyService.deleteRecord(mockRecord.id);

		expect(historyActions.deleteRecord).toHaveBeenCalledWith(mockRecord.id);
		expect(historyApi.saveRecord).toHaveBeenCalled();
	});

	it("clearRecords() вызывает clearRecords и saveRecord", () => {
		useHistoryStore.setState(() => ({ records: [mockRecord] }));

		historyService.clearRecords();

		expect(historyActions.clearRecords).toHaveBeenCalled();
		expect(historyApi.saveRecord).toHaveBeenCalled();
	});
});
