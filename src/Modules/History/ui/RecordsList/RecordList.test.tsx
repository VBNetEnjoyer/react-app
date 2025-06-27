import { act, fireEvent, render, screen } from "@testing-library/react";
import { RecordsList } from "@/Modules/History/ui/RecordsList/RecordsList.tsx";
import { historyService } from "@/Modules/History/model/services/historyService.ts";
import { useHistoryStore } from "@/Modules/History/model/store/historyStore.ts";
import type { AppId } from "@/Shared/types";
import type { AnalyticsRecord } from "@/Modules/Analytics";
import { afterEach } from "vitest";

const recordId = "xyz-001" as AppId;
const mockRecord: AnalyticsRecord = {
	id: recordId,
	fileName: "galaxy.csv",
	date: new Date("2025-06-26"),
	isSuccess: true,
};

describe("RecordsList", () => {
	afterEach(() => {
		act(() => {
			useHistoryStore.setState(() => useHistoryStore.getInitialState());
		});
	});

	it("отображает список записей", () => {
		useHistoryStore.setState((state) => ({ ...state, records: [mockRecord] }));

		render(<RecordsList onRecordClick={vi.fn()} />);
		expect(screen.getByText("galaxy.csv")).toBeInTheDocument();
	});

	it("показывает сообщение, если записей нет", () => {
		render(<RecordsList onRecordClick={vi.fn()} />);
		expect(screen.getByText("Записей нет :(")).toBeInTheDocument();
	});

	it("вызывает onRecordClick при клике на запись с правильным объектом", () => {
		useHistoryStore.setState((state) => ({ ...state, records: [mockRecord] }));

		const handleClick = vi.fn();

		render(<RecordsList onRecordClick={handleClick} />);
		fireEvent.click(screen.getByText("galaxy.csv"));
		expect(handleClick).toHaveBeenCalledWith(mockRecord);
	});

	it("вызывает historyService.deleteRecord при удалении записи с правильным id", () => {
		useHistoryStore.setState((state) => ({ ...state, records: [mockRecord] }));
		historyService.deleteRecord = vi.fn();

		render(<RecordsList onRecordClick={vi.fn()} />);
		fireEvent.click(screen.getByRole("button")); // кнопка удаления

		expect(historyService.deleteRecord).toHaveBeenCalledWith(recordId);
	});
});
