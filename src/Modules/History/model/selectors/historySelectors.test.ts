import type { HistoryStoreScheme } from "@/Modules/History/model/types";
import { getHasAnalyticsRecords } from "./historySelectors.ts";
import type { AppId } from "@/Shared/types";

describe("getHasAnalyticsRecords", () => {
	it("возвращает false, если records пуст", () => {
		const state: HistoryStoreScheme = {
			records: [],
		};

		expect(getHasAnalyticsRecords(state)).toBe(false);
	});

	it("возвращает true, если есть хотя бы одна запись", () => {
		const state: HistoryStoreScheme = {
			records: [
				{
					id: "abc-123" as AppId,
					fileName: "data.csv",
					date: new Date(),
					isSuccess: true,
				},
			],
		};

		expect(getHasAnalyticsRecords(state)).toBe(true);
	});
});
