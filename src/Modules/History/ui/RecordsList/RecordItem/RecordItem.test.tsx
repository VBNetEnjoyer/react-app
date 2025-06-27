import { render, screen, fireEvent } from "@testing-library/react";
import { RecordItem } from "./RecordItem";
import type { AnalyticsRecord } from "@/Modules/Analytics";
import type { AppId } from "@/Shared/types";

const recordId = "abc-123" as AppId;
const baseRecord: AnalyticsRecord = {
	id: recordId,
	fileName: "test.csv",
	date: new Date("2025-06-25"),
	isSuccess: true,
};

describe("RecordItem", () => {
	it("отображает имя файла и дату", () => {
		render(
			<RecordItem
				record={baseRecord}
				onDelete={vi.fn()}
				onRecordClick={vi.fn()}
			/>,
		);
		expect(screen.getByText("test.csv")).toBeInTheDocument();
		expect(screen.getByText("25.06.2025")).toBeInTheDocument(); // зависит от локали!
	});

	it("отображает статус 'Обработано успешно' и иконку", () => {
		render(
			<RecordItem
				record={baseRecord}
				onDelete={vi.fn()}
				onRecordClick={vi.fn()}
			/>,
		);
		expect(screen.getByText("Обработано успешно")).toBeInTheDocument();
		expect(screen.getByText("Не удалось обработать")).toBeInTheDocument(); // всегда отображается
	});

	it("по клику на запись вызывает onRecordClick, если isSuccess = true", () => {
		const handleClick = vi.fn();
		render(
			<RecordItem
				record={baseRecord}
				onDelete={vi.fn()}
				onRecordClick={handleClick}
			/>,
		);
		fireEvent.click(screen.getByText("test.csv"));
		expect(handleClick).toHaveBeenCalledWith(baseRecord);
	});

	it("по клику на запись не вызывает onRecordClick, если isSuccess = false", () => {
		const handleClick = vi.fn();
		const failedRecord = { ...baseRecord, isSuccess: false };
		render(
			<RecordItem
				record={failedRecord}
				onDelete={vi.fn()}
				onRecordClick={handleClick}
			/>,
		);
		fireEvent.click(screen.getByText("test.csv"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("по клику на кнопку удаления вызывает onDelete с id", () => {
		const handleDelete = vi.fn();
		render(
			<RecordItem
				record={baseRecord}
				onDelete={handleDelete}
				onRecordClick={vi.fn()}
			/>,
		);
		fireEvent.click(screen.getByRole("button"));
		expect(handleDelete).toHaveBeenCalledWith(recordId);
	});
});
