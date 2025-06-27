import { render } from "@testing-library/react";
import { PropertyRow } from "@/Shared/ui/PropertyRow/PropertyRow.tsx";
import cls from "./PropertyRow.module.css";

describe("PropertyRow", () => {
	it("отображает значение", () => {
		const { getByText } = render(
			<PropertyRow
				title="totalSpendGalactic"
				value="5000"
			/>,
		);
		expect(getByText("5000")).toBeInTheDocument();
	});

	it("отображает подпись по ключу title из displayValues", () => {
		const { getByText } = render(
			<PropertyRow
				title="lessSpentCiv"
				value="Zorgon"
			/>,
		);
		expect(getByText("цивилизация с минимальными расходами")).toBeInTheDocument();
	});

	it("всегда содержит базовый класс cls.root", () => {
		const { container } = render(
			<PropertyRow
				title="averageSpendGalactic"
				value="123"
			/>,
		);
		expect(container.firstChild).toHaveClass(cls.root);
	});

	it("добавляет класс cls.modal, если isModal=true", () => {
		const { container } = render(
			<PropertyRow
				title="averageSpendGalactic"
				value="123"
				isModal
			/>,
		);
		expect(container.firstChild).toHaveClass(cls.modal);
	});
});
