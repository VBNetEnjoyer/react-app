import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { UploadCard } from "./UploadCard";
import { useAnalyticsStore } from "@/Modules/Analytics/model/store/analyticsStore";
import { mockAnalyticsService } from "@/Modules/Analytics/model/services/tests/mock.ts";

describe("UploadCard", () => {
	let analyticsService: ReturnType<typeof mockAnalyticsService>;

	beforeEach(() => {
		analyticsService = mockAnalyticsService();

		useAnalyticsStore.setState(() => useAnalyticsStore.getInitialState());
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("по умолчанию отображается состояние 'waiting'", () => {
		render(<UploadCard />);
		expect(screen.getByText("или перетащите сюда")).toBeInTheDocument();
	});

	it("при наличии ошибки отображается состояние 'error'", () => {
		useAnalyticsStore.setState(() => ({
			file: undefined,
			hasError: true,
			isLoading: false,
			done: false,
		}));

		render(<UploadCard />);

		expect(screen.getByText("Упс, не то...")).toBeInTheDocument();
	});

	it("в процессе загрузки отображается спиннер", () => {
		useAnalyticsStore.setState(() => ({
			file: undefined,
			hasError: false,
			isLoading: true,
			done: false,
		}));

		render(<UploadCard />);
		expect(screen.getByTestId("upload-button-spinner")).toBeInTheDocument();
	});

	it("после загрузки файла отображается его имя", () => {
		const fakeFile = new File(["csv content"], "test.csv", { type: "text/csv" });
		useAnalyticsStore.setState(() => ({
			file: fakeFile,
			hasError: false,
			isLoading: false,
			done: false,
		}));

		render(<UploadCard />);

		expect(screen.getByText("test.csv")).toBeInTheDocument();
	});

	it("при выборе файла вызывается analyticsService.setFile", async () => {
		render(<UploadCard />);
		const fileInput = screen.getByTestId("file-input") as HTMLInputElement;
		const file = new File(["test content"], "file.csv", { type: "text/csv" });

		fireEvent.change(fileInput, {
			target: { files: [file] },
		});

		expect(analyticsService.setFile).toHaveBeenCalledWith(file);
	});

	it("при нажатии на крестик вызывается analyticsService.setFile(undefined)", async () => {
		const fakeFile = new File(["csv content"], "test.csv", { type: "text/csv" });
		useAnalyticsStore.setState(() => ({
			file: fakeFile,
			hasError: false,
			isLoading: false,
			done: false,
		}));

		render(<UploadCard />);
		const removeButton = screen.getByRole("button"); // SquareButton
		fireEvent.click(removeButton);

		expect(analyticsService.setFile).toHaveBeenCalledWith(undefined);
	});

	it("обработка события drop вызывает analyticsService.setFile", () => {
		render(<UploadCard />);
		const card = screen.getByTestId("upload-card");
		const file = new File(["data"], "dropped.csv", { type: "text/csv" });

		const dataTransfer = {
			files: [file],
		};

		const dropEvent = new Event("drop", { bubbles: true }) as any;
		dropEvent.dataTransfer = dataTransfer;

		fireEvent(card, dropEvent);

		expect(analyticsService.setFile).toHaveBeenCalledWith(file);
	});

	it("устанавливает background при dragenter и сбрасывает при dragleave", () => {
		render(<UploadCard />);
		const card = screen.getByTestId("upload-card");

		// dragenter
		fireEvent.dragEnter(card);
		expect(card).toHaveStyle({ background: "#D4FAE6" });

		fireEvent.dragLeave(card, {
			relatedTarget: null,
		});
		expect(card).toHaveStyle({ background: "" });
	});
});
