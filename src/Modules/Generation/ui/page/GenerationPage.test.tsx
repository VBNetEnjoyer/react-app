import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GenerationPage } from "./GenerationPage";
import { mockGenerationService } from "@/Modules/Generation/model/servicies/tests/mock.ts";

describe("Компонент GenerationPage", () => {
	let generationService: ReturnType<typeof mockGenerationService>;
	beforeEach(() => {
		generationService = mockGenerationService();
	});
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("по умолчанию показывает кнопку 'Начать генерацию'", () => {
		render(<GenerationPage />);
		expect(screen.getByTestId("generate-button")).toBeInTheDocument();
		expect(screen.getByText("Сгенерируйте готовый csv-файл нажатием одной кнопки")).toBeInTheDocument();
	});

	it("при успешной генерации отображается состояние 'done'", async () => {
		generationService.generateFile.mockResolvedValueOnce(undefined);

		render(<GenerationPage />);

		fireEvent.click(screen.getByTestId("generate-button"));

		await waitFor(() => {
			expect(screen.getByText("файл сгенерирован!")).toBeInTheDocument();
			expect(screen.getByText("Done")).toBeInTheDocument();
		});
	});

	it("при ошибке генерации отображается состояние 'error'", async () => {
		generationService.generateFile.mockRejectedValueOnce(new Error("Ошибка"));

		render(<GenerationPage />);

		fireEvent.click(screen.getByTestId("generate-button"));

		await waitFor(() => {
			expect(screen.getByText("упс, не то...")).toBeInTheDocument();
			expect(screen.getByText("Ошибка")).toBeInTheDocument();
		});
	});

	it("в процессе генерации отображается 'идёт процесс генерации'", async () => {
		const promise = new Promise<void>(() => {});

		generationService.generateFile.mockImplementation(() => promise);

		render(<GenerationPage />);
		fireEvent.click(screen.getByTestId("generate-button"));

		await waitFor(() => {
			expect(screen.getByText("идёт процесс генерации")).toBeInTheDocument();
		});
	});

	it("кнопка сброса сбрасывает состояние", async () => {
		generationService.generateFile.mockResolvedValueOnce(undefined);

		render(<GenerationPage />);
		fireEvent.click(screen.getByTestId("generate-button"));

		await waitFor(() => {
			expect(screen.getByText("файл сгенерирован!")).toBeInTheDocument();
		});

		// Нажимаем на крестик (кнопка удалить)
		const removeButton = screen.getByRole("button");
		fireEvent.click(removeButton);

		// Ожидаем возвращения к кнопке генерации
		await waitFor(() => {
			expect(screen.getByTestId("generate-button")).toBeInTheDocument();
		});
	});
});
