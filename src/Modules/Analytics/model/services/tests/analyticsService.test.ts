import { mockAnalyticsActions } from "@/Modules/Analytics/model/store/tests/mock.ts";
import { mockAnalyticsApi } from "@/Modules/Analytics/model/api/tests/mock.ts";
import type { AnalyticsData } from "@/Modules/Analytics";
import { useAnalyticsStore } from "@/Modules/Analytics/model/store/analyticsStore.ts";
import { analyticsService } from "@/Modules/Analytics/model/services/analyticsService.ts";
import { expect } from "vitest";

describe("AnalyticsService", () => {
	let actionsMock: ReturnType<typeof mockAnalyticsActions>;
	let apiMock: ReturnType<typeof mockAnalyticsApi>;

	// Тестовые данные
	const mockFile = new File(["content"], "test.csv", { type: "text/csv" });
	const mockInvalidFile = new File(["content"], "test.txt", { type: "text/plain" });
	const mockAnalyticsData: AnalyticsData = {
		totalSpendGalactic: 1000,
		lessSpentCiv: "Test Civ",
		rowsAffected: 50,
		bigSpentAt: 100,
		lessSpentAt: 10,
		bigSpentValue: 200,
		bigSpentCiv: "Test Civ 2",
		averageSpendGalactic: 20,
	};

	beforeEach(() => {
		// Инициализируем моки
		actionsMock = mockAnalyticsActions();
		apiMock = mockAnalyticsApi();

		// Сбрасываем состояние хранилища
		useAnalyticsStore.setState(
			{
				file: null,
				data: undefined,
				done: false,
				isLoading: false,
				hasError: false,
			},
			true,
		);

		// Мокаем crypto.randomUUID
		vi.spyOn(window.crypto, "randomUUID").mockImplementation(() => "mocked-uuid" as never);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("verifyFile", () => {
		it("должен возвращать true для null/undefined", () => {
			expect(analyticsService.verifyFile(null)).toBe(true);
			expect(analyticsService.verifyFile(undefined)).toBe(true);
		});

		it("должен возвращать true для CSV файлов", () => {
			expect(analyticsService.verifyFile(mockFile)).toBe(true);
		});

		it("должен возвращать false для не-CSV файлов", () => {
			expect(analyticsService.verifyFile(mockInvalidFile)).toBe(false);
		});
	});

	describe("setFile", () => {
		it("должен вызывать setAnalyticsFile для валидного файла", () => {
			analyticsService.setFile(mockFile);
			expect(actionsMock.setAnalyticsFile).toHaveBeenCalledWith(mockFile);
		});

		it("не должен вызывать setAnalyticsFile для невалидного файла", () => {
			analyticsService.setFile(mockInvalidFile);
			expect(actionsMock.setAnalyticsFile).not.toHaveBeenCalled();
		});

		it("должен обрабатывать null/undefined значения", () => {
			analyticsService.setFile(null);
			expect(actionsMock.setAnalyticsFile).toHaveBeenCalledWith(null);
		});
	});

	describe("sendFile", () => {
		it("должен корректно обрабатывать успешную загрузку", async () => {
			// Настраиваем мок API
			apiMock.uploadAndAggregate.mockImplementation((_, onData) => {
				onData(false, mockAnalyticsData); // Промежуточные данные
				onData(true, null); // Завершение
				return Promise.resolve();
			});

			// Устанавливаем файл в хранилище
			useAnalyticsStore.setState({ file: mockFile });

			await analyticsService.sendFile(mockFile);

			// Проверяем вызовы actions
			expect(actionsMock.startLoading).toHaveBeenCalled();
			expect(actionsMock.setAnalyticsData).toHaveBeenCalledWith(mockAnalyticsData);
			expect(actionsMock.fulfillLoading).toHaveBeenCalled();

			// Проверяем вызовы API
			expect(apiMock.uploadAndAggregate).toHaveBeenCalledWith(
				mockFile,
				expect.any(Function),
				expect.any(Function),
			);
			expect(apiMock.getSavedRecords).toHaveBeenCalled();
			expect(apiMock.saveRecords).toHaveBeenCalled();
		});

		it("должен корректно обрабатывать ошибку загрузки", async () => {
			apiMock.uploadAndAggregate.mockImplementation((_, __, onError) => {
				onError("err");
				return Promise.resolve();
			});

			// @ts-expect-error небольшой хак т.к. немного криво написан сам сервис...
			vi.spyOn(analyticsService, "saveAnalyticsData").mockImplementation(() => {});
			await analyticsService.sendFile(mockFile);

			expect(actionsMock.startLoading).toHaveBeenCalled();
			expect(actionsMock.rejectLoading).toHaveBeenCalled();
			expect(actionsMock.setAnalyticsData).not.toHaveBeenCalled();
			expect(actionsMock.fulfillLoading).not.toHaveBeenCalled();
			expect(analyticsService["saveAnalyticsData"]).toHaveBeenCalled();
		});
	});

	describe("saveAnalyticsData", () => {
		it("должен сохранять данные при успешной загрузке", () => {
			// Настраиваем состояние хранилища
			useAnalyticsStore.setState({
				file: mockFile,
				data: mockAnalyticsData,
				done: true,
			});

			// Настраиваем мок API
			apiMock.getSavedRecords.mockReturnValue([]);

			// Вызываем приватный метод через публичный sendFile
			analyticsService["saveAnalyticsData"]();

			// Проверяем что запись сохранилась правильно
			expect(apiMock.saveRecords).toHaveBeenCalledWith(
				expect.objectContaining({
					id: "mocked-uuid",
					isSuccess: true,
					fileName: mockFile.name,
					data: mockAnalyticsData,
				}),
				[],
			);
		});

		it("не должен сохранять данные при ошибке загрузки", () => {
			useAnalyticsStore.setState({
				file: mockFile,
				done: false,
				hasError: true,
			});

			analyticsService["saveAnalyticsData"]();

			expect(apiMock.saveRecords).toHaveBeenCalledWith(
				expect.objectContaining({
					isSuccess: false,
					data: undefined,
				}),
				expect.any(Array),
			);
		});
	});
});
