import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RecordModal } from "./RecordModal";
import type { AnalyticsData, AnalyticsRecord } from "@/Modules/Analytics";
import type { AppId } from "@/Shared/types";

// Мокаем Modal и PropertyRow
vi.mock("@/Shared/ui/Modal/Modal.tsx", () => ({
	Modal: ({ children }: any) => <div data-testid="modal">{children}</div>,
}));

vi.mock("@/Shared/ui/PropertyRow/PropertyRow.tsx", () => ({
	PropertyRow: ({ title, value }: any) => (
		<div data-testid="property-row">
			<span>{title}</span>: <span>{value}</span>
		</div>
	),
}));

describe("RecordModal", () => {
	it("не рендерится, если нет записи", () => {
		render(
			<RecordModal
				isOpen={true}
				onClose={() => {}}
				selectedRecord={null}
			/>,
		);

		expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
	});

	it("не рендерится, если данные для строк отсутствуют", () => {
		const record = {
			id: "test-id" as AppId,
			data: undefined,
		} as AnalyticsRecord;

		render(
			<RecordModal
				isOpen={true}
				onClose={() => {}}
				selectedRecord={record}
			/>,
		);

		expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
	});

	it("рендерится и отображает строки при наличии данных", () => {
		const record = {
			id: "record-1" as AppId,
			data: {
				totalSpendGalactic: 1000,
				rowsAffected: 1000,
			} as AnalyticsData,
		} as AnalyticsRecord;

		render(
			<RecordModal
				isOpen={true}
				onClose={() => {}}
				selectedRecord={record}
			/>,
		);

		// Проверяем, что модальное окно есть
		expect(screen.getByTestId("modal")).toBeInTheDocument();

		// Проверяем, что отрендерились строки свойств
		const rows = screen.getAllByTestId("property-row");
		expect(rows).toHaveLength(2);
	});
});
