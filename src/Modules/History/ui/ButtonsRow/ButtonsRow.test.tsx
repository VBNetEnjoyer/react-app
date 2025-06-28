import { act, fireEvent, render, screen } from "@testing-library/react";
import { ButtonsRow } from "@/Modules/History/ui/ButtonsRow/ButtonsRow";
import { historyService } from "@/Modules/History/model/services/historyService.ts";
import { useHistoryStore } from "@/Modules/History/model/store/historyStore.ts";
import { afterEach, beforeEach, vi } from "vitest";
import { mockHistoryService } from "@/Modules/History/model/services/tests/mock.ts";
import { MemoryRouter } from "react-router";

describe("ButtonsRow", () => {
	beforeEach(() => {
		act(() => {
			useHistoryStore.setState(() => useHistoryStore.getInitialState());
		});
		mockHistoryService();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("отображает только кнопку 'Сгенерировать' когда записей нет", () => {
		useHistoryStore.setState({ records: [] });

		renderButtonsRow();

		expect(screen.getByTestId("generate-more-button")).toBeInTheDocument();
		expect(screen.queryByText("Очистить всё")).not.toBeInTheDocument();
	});

	it("отображает кнопки 'Сгенерировать больше' и 'Очистить всё' когда есть записи", () => {
		useHistoryStore.setState({ records: [{ id: "1" } as any] });

		renderButtonsRow();

		expect(screen.getByTestId("generate-more-button")).toBeInTheDocument();
		expect(screen.getByTestId("clear-all-button")).toBeInTheDocument();
	});

	it("вызывает historyService.clearRecords при клике на 'Очистить всё'", () => {
		useHistoryStore.setState({ records: [{ id: "1" } as any] });

		renderButtonsRow();
		fireEvent.click(screen.getByTestId("clear-all-button"));

		expect(historyService.clearRecords).toHaveBeenCalledTimes(1);
	});

	it("применяет переданный className", () => {
		useHistoryStore.setState({ records: [] });

		const { container } = renderButtonsRow();
		expect(container.firstChild).toHaveClass("test-class");
	});
});

function renderButtonsRow() {
	return render(
		<MemoryRouter>
			<ButtonsRow className="test-class" />
		</MemoryRouter>,
	);
}
