import { describe, it, expect, beforeEach } from "vitest";
import { useAnalyticsStore } from "@/Modules/Analytics/model/store/analyticsStore.ts";
import type { AnalyticsData } from "@/Modules/Analytics";
import { analyticsActions } from "@/Modules/Analytics/model/store/analyticsActions.ts";

// Тестовые данные
const mockFile = { name: "test.csv", size: 1024 } as File;
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

describe("analyticsActions", () => {
	// Сбрасываем состояние хранилища перед каждым тестом
	beforeEach(() => {
		useAnalyticsStore.setState(
			{
				file: null,
				data: undefined,
				done: false,
				isLoading: false,
				hasError: false,
			},
			true,
		); // true для полного замещения состояния
	});

	describe("setAnalyticsFile", () => {
		it("должен обновлять файл и сбрасывать связанное состояние", () => {
			// Устанавливаем начальное состояние
			useAnalyticsStore.setState({
				data: mockAnalyticsData,
				done: true,
				isLoading: true,
				hasError: true,
			});

			// Вызываем тестируемое действие
			analyticsActions.setAnalyticsFile(mockFile);

			// Проверяем результат
			const state = useAnalyticsStore.getState();
			expect(state.file).toEqual(mockFile);
			expect(state.data).toBeUndefined();
			expect(state.done).toBe(false);
			expect(state.isLoading).toBe(false);
			expect(state.hasError).toBe(false);
		});

		it("должен обрабатывать null как значение файла", () => {
			analyticsActions.setAnalyticsFile(null);

			const state = useAnalyticsStore.getState();
			expect(state.file).toBeNull();
			expect(state.data).toBeUndefined();
		});
	});

	describe("setAnalyticsData", () => {
		it("должен обновлять только данные аналитики", () => {
			// Устанавливаем начальное состояние
			useAnalyticsStore.setState({
				file: mockFile,
				done: true,
				isLoading: true,
				hasError: true,
			});

			analyticsActions.setAnalyticsData(mockAnalyticsData);

			const state = useAnalyticsStore.getState();
			expect(state.data).toEqual(mockAnalyticsData);
			// Проверяем что другие поля не изменились
			expect(state.file).toEqual(mockFile);
			expect(state.done).toBe(true);
			expect(state.isLoading).toBe(true);
			expect(state.hasError).toBe(true);
		});
	});

	describe("startLoading", () => {
		it("должен устанавливать флаги начала загрузки", () => {
			useAnalyticsStore.setState({
				done: true,
				hasError: true,
			});

			analyticsActions.startLoading();

			const state = useAnalyticsStore.getState();
			expect(state.done).toBe(false);
			expect(state.isLoading).toBe(true);
			expect(state.hasError).toBe(false);
		});
	});

	describe("fulfillLoading", () => {
		it("должен устанавливать флаги успешного завершения", () => {
			useAnalyticsStore.setState({
				isLoading: true,
				hasError: true,
			});

			analyticsActions.fulfillLoading();

			const state = useAnalyticsStore.getState();
			expect(state.done).toBe(true);
			expect(state.isLoading).toBe(false);
			expect(state.hasError).toBe(false);
		});
	});

	describe("rejectLoading", () => {
		it("должен устанавливать флаги ошибки загрузки", () => {
			useAnalyticsStore.setState({
				isLoading: true,
				done: true,
			});

			analyticsActions.rejectLoading();

			const state = useAnalyticsStore.getState();
			expect(state.done).toBe(false);
			expect(state.isLoading).toBe(false);
			expect(state.hasError).toBe(true);
		});
	});
});
