import { render, screen, fireEvent } from "@testing-library/react";
import { UploadButton } from "./UploadButton";
import { describe, it, expect, vi } from "vitest";

describe("UploadButton", () => {
	it("отображает кнопку загрузки и подсказку в состоянии 'waiting'", () => {
		render(<UploadButton state="waiting" />);
		expect(screen.getByText("Загрузить файл")).toBeInTheDocument();
		expect(screen.getByText("или перетащите сюда")).toBeInTheDocument();
	});

	it("отображает спиннер в состоянии 'pending'", () => {
		render(<UploadButton state="pending" />);
		expect(screen.getByTestId("upload-button-spinner")).toBeInTheDocument();
	});

	it("отображает имя файла и кнопку удаления в состоянии 'loaded'", () => {
		render(
			<UploadButton
				state="loaded"
				fileName="file.csv"
				onRemove={vi.fn()}
			/>,
		);
		expect(screen.getByText("file.csv")).toBeInTheDocument();
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("вызывает onRemove при клике на кнопку удаления", () => {
		const onRemove = vi.fn();
		render(
			<UploadButton
				state="error"
				fileName="file.csv"
				onRemove={onRemove}
			/>,
		);
		fireEvent.click(screen.getByRole("button"));
		expect(onRemove).toHaveBeenCalled();
	});

	it("вызывает onUploaded при выборе файла", () => {
		const onUploaded = vi.fn();
		render(
			<UploadButton
				state="waiting"
				onUploaded={onUploaded}
			/>,
		);
		const input = screen.getByTestId("file-input");

		const file = new File(["content"], "test.csv", { type: "text/csv" });
		fireEvent.change(input, { target: { files: [file] } });
		expect(onUploaded).toHaveBeenCalledWith(file);
	});
});
