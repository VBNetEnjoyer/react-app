import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SquareButton } from "@/Shared/ui/IconButton/SquareButton.tsx";

describe("SquareButton", () => {
	it("Отображает переданный текст", () => {
		render(<SquareButton>Кнопка</SquareButton>);
		expect(screen.getByRole("button")).toHaveTextContent("Кнопка");
	});

	it("Добавляет нужный класс для цвета зависящий от пропса", () => {
		render(<SquareButton color="black">X</SquareButton>);
		const button = screen.getByRole("button");
		expect(button.className).toContain("black");
	});

	it("Disabled отключает кнопку", () => {
		render(<SquareButton disabled>X</SquareButton>);
		const button = screen.getByRole("button");
		expect(button).toBeDisabled();
	});

	it("onClick вызывается при клике", () => {
		const onClick = vi.fn();
		render(<SquareButton onClick={onClick}>Клик</SquareButton>);
		const button = screen.getByRole("button");
		button.click();
		expect(onClick).toHaveBeenCalled();
	});

	it("className с пропсов устанавливается", () => {
		render(<SquareButton className="custom-class">Кнопка</SquareButton>);
		const button = screen.getByRole("button");
		expect(button.className).toContain("custom-class");
	});
});
