import { fireEvent, render, screen } from "@testing-library/react";
import { HistoryPage } from "@/Modules/History";
import { mockHistoryService } from "@/Modules/History/model/services/tests/mock.ts";
import { historyService } from "@/Modules/History/model/services/historyService.ts";
import { MemoryRouter } from "react-router";

vi.mock("../RecordsList/RecordsList.tsx", () => ({
	RecordsList: ({ onRecordClick }: { onRecordClick: (record: any) => void }) => (
		<div data-testid="mock-records-list">
			<button
				data-testid="mock-record-item"
				onClick={() => onRecordClick({ id: "1", name: "Test Record" })}
			>
				Mock Record
			</button>
		</div>
	),
}));

vi.mock("../ButtonsRow/ButtonsRow.tsx", () => ({
	ButtonsRow: () => <div data-testid="mock-buttons-row">Mock Buttons Row</div>,
}));

vi.mock("../RecordModal/RecordModal.tsx", () => ({
	RecordModal: ({ isOpen }: { isOpen: boolean }) => (
		<div data-testid="mock-record-modal">{isOpen ? "Modal Open" : "Modal Closed"}</div>
	),
}));

describe("HistoryPage", () => {
	beforeEach(() => {
		mockHistoryService();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("должен вызывать validateRecords при монтировании", () => {
		renderHistoryPage();

		expect(historyService.validateRecords).toHaveBeenCalledTimes(1);
	});

	it("должен открывать модальное окно при клике на запись", async () => {
		renderHistoryPage();

		fireEvent.click(screen.getByTestId("mock-record-item"));

		// Проверяем, что модальное окно получило isOpen=true
		expect(screen.getByText("Modal Open")).toBeInTheDocument();
	});
});

function renderHistoryPage() {
	return render(
		<MemoryRouter>
			<HistoryPage />
		</MemoryRouter>,
	);
}
