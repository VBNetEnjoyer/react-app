import { describe, it, expect, beforeEach } from "vitest";
import type { AnalyticsRecord } from "@/Modules/Analytics";
import type { AppId } from "@/Shared/types";
import { useHistoryStore } from "@/Modules/History/model/store/historyStore.ts";
import { historyActions } from "@/Modules/History/model/store/historyActions.ts";

// Создаем тестовые данные
export const mockRecord1: AnalyticsRecord = {
	id: "1" as AppId,
	date: new Date(),
	isSuccess: true,
	fileName: "test1.csv",
};
export const mockRecord2: AnalyticsRecord = {
	id: "2" as AppId,
	date: new Date(),
	isSuccess: true,
	fileName: "test2.csv",
};
export const mockRecord3: AnalyticsRecord = {
	id: "3" as AppId,
	date: new Date(),
	isSuccess: true,
	fileName: "test3.csv",
};

describe("historyActions", () => {
	beforeEach(() => {
		// Очищаем хранилище перед каждым тестом
		useHistoryStore.setState({ records: [] });
	});

	it("setRecord должен устанавливать записи в хранилище", () => {
		const testRecords = [mockRecord1, mockRecord2];

		historyActions.setRecord(testRecords);

		const { records } = useHistoryStore.getState();
		expect(records).toEqual(testRecords);
		expect(records).toHaveLength(2);
	});

	it("setRecord должен перезаписывать существующие записи", () => {
		// Сначала устанавливаем начальные записи
		historyActions.setRecord([mockRecord1]);

		// Затем перезаписываем
		const newRecords = [mockRecord2, mockRecord3];
		historyActions.setRecord(newRecords);

		const { records } = useHistoryStore.getState();
		expect(records).toEqual(newRecords);
		expect(records).toHaveLength(2);
	});

	it("deleteRecord должен удалять запись по ID", () => {
		// Устанавливаем начальные записи
		historyActions.setRecord([mockRecord1, mockRecord2, mockRecord3]);

		// Удаляем одну запись
		historyActions.deleteRecord("2" as AppId);

		const { records } = useHistoryStore.getState();
		expect(records).toEqual([mockRecord1, mockRecord3]);
		expect(records).toHaveLength(2);
	});

	it("deleteRecord не должен изменять хранилище если запись с указанным ID не найдена", () => {
		historyActions.setRecord([mockRecord1, mockRecord2]);

		historyActions.deleteRecord("999" as AppId);

		const { records } = useHistoryStore.getState();
		expect(records).toEqual([mockRecord1, mockRecord2]);
		expect(records).toHaveLength(2);
	});

	it("clearRecords должен очищать все записи из хранилища", () => {
		// Устанавливаем начальные записи
		historyActions.setRecord([mockRecord1, mockRecord2, mockRecord3]);

		// Очищаем
		historyActions.clearRecords();

		const { records } = useHistoryStore.getState();
		expect(records).toEqual([]);
		expect(records).toHaveLength(0);
	});

	it("clearRecords должен работать корректно при пустом хранилище", () => {
		// Убедимся что хранилище пустое
		expect(useHistoryStore.getState().records).toEqual([]);

		// Вызываем очистку
		historyActions.clearRecords();

		const { records } = useHistoryStore.getState();
		expect(records).toEqual([]);
	});
});
