import { $api } from "@/Shared/api/$api.ts";
import type { Mock } from "vitest";
import { analyticsApi } from "@/Modules/Analytics/model/api/analyticsApi.ts";
import type { AnalyticsRecord } from "@/Modules/Analytics";
import { $storage } from "@/Shared/storage/$storage.ts";
import { ANALYTICS_RECORDS_KEY } from "@/Shared/consts/localStorageKeys.ts";
/* Вот тут уже понял что надо было сделать это раньше, но увы, будет опытом, переписывать другие места не буду */
import { mockRecord1, mockRecord2 } from "@/Modules/History/model/store/tests/historyActions.test.ts";

vi.mock("@/Shared/api/$api.ts");
vi.mock("@/Shared/storage/$storage.ts");

describe("AnalyticsApi", () => {
	const mockFile = new File(["test"], "test.csv");
	const mockOnData = vi.fn();
	const mockOnError = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("uploadAndAggregate", () => {
		const mockRawData = {
			total_spend_galactic: 1000,
			rows_affected: 50,
			less_spent_at: 10,
			big_spent_at: 100,
			less_spent_value: 5,
			big_spent_value: 200,
			average_spend_galactic: 20,
			big_spent_civ: "Civilization1",
			less_spent_civ: "Civilization2",
		};

		it("должен корректно обрабатывать успешную загрузку и агрегацию данных", async () => {
			($api.uploadStream as Mock).mockImplementation((_, __, ___, callback) => {
				callback(false, mockRawData);
				callback(true, null);
				return Promise.resolve();
			});

			await analyticsApi.uploadAndAggregate(mockFile, mockOnData, mockOnError);

			expect(mockOnData).toHaveBeenCalledTimes(2);
			expect(mockOnData).toHaveBeenCalledWith(false, {
				totalSpendGalactic: 1000,
				lessSpentCiv: "Civilization2",
				rowsAffected: 50,
				bigSpentAt: 100,
				lessSpentAt: 10,
				bigSpentValue: 200,
				bigSpentCiv: "Civilization1",
				averageSpendGalactic: 20,
			});
			expect(mockOnData).toHaveBeenCalledWith(true, null);
			expect(mockOnError).not.toHaveBeenCalled();
		});

		it("должен вызывать onError при получении некорректных данных", async () => {
			const invalidData = {
				...mockRawData,
				invalid_key: "value", // Добавляем неожиданное поле
			};

			($api.uploadStream as Mock).mockImplementation((_, __, ___, callback) => {
				callback(false, invalidData);
				return Promise.resolve();
			});

			await analyticsApi.uploadAndAggregate(mockFile, mockOnData, mockOnError);

			expect(mockOnError).toHaveBeenCalled();
		});

		it("должен вызывать onError при ошибке загрузки", async () => {
			($api.uploadStream as Mock).mockImplementation(() => {
				return Promise.reject(new Error("Upload error"));
			});

			await analyticsApi.uploadAndAggregate(mockFile, mockOnData, mockOnError);

			expect(mockOnError).toHaveBeenCalled();
		});
	});

	describe("getSavedRecords", () => {
		it("должен возвращать сохраненные записи из хранилища", () => {
			const mockRecords: AnalyticsRecord[] = [mockRecord1, mockRecord2];

			($storage.getValue as Mock).mockReturnValue(mockRecords);

			const result = analyticsApi.getSavedRecords();

			expect($storage.getValue).toHaveBeenCalledWith(ANALYTICS_RECORDS_KEY, []);
			expect(result).toEqual(mockRecords);
		});

		it("должен возвращать пустой массив если в хранилище нет записей", () => {
			($storage.getValue as Mock).mockReturnValue([]);

			const result = analyticsApi.getSavedRecords();

			expect(result).toEqual([]);
		});
	});

	describe("saveRecords", () => {
		it("должен сохранять новую запись вместе с предыдущими", () => {
			const prevRecords: AnalyticsRecord[] = [mockRecord1];
			const newRecord: AnalyticsRecord = mockRecord2;

			analyticsApi.saveRecords(newRecord, prevRecords);

			expect($storage.setValue).toHaveBeenCalledWith(ANALYTICS_RECORDS_KEY, [newRecord, ...prevRecords]);
		});

		it("должен корректно сохранять первую запись", () => {
			const newRecord: AnalyticsRecord = mockRecord1;

			analyticsApi.saveRecords(newRecord, []);

			expect($storage.setValue).toHaveBeenCalledWith(ANALYTICS_RECORDS_KEY, [newRecord]);
		});
	});
});
