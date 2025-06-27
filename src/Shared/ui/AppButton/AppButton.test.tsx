import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppButton } from "@/Shared/ui/AppButton/AppButton.tsx";

describe("AppButton", () => {
	it("Отображает переданный текст", () => {
		render(<AppButton>Кнопка</AppButton>);
		expect(screen.getByRole("button")).toHaveTextContent("Кнопка");
	});

	it("Добавляет нужный класс для цвета зависящий от пропса", () => {
		render(<AppButton color="green">Кнопка</AppButton>);
		const button = screen.getByRole("button");
		expect(button.className).toContain("green");
	});

	it("Disabled отключает кнопку и добавляет класс состояния", () => {
		render(<AppButton disabled>Неактивная</AppButton>);
		const button = screen.getByRole("button");
		expect(button).toBeDisabled();
		expect(button.className).toContain("stateDisabled");
	});

	it("onClick вызывается при клике", () => {
		const onClick = vi.fn();
		render(<AppButton onClick={onClick}>Клик</AppButton>);
		const button = screen.getByRole("button");
		button.click();
		expect(onClick).toHaveBeenCalled();
	});

	it("className с пропсов устанавливается", () => {
		render(<AppButton className="custom-class">Кнопка</AppButton>);
		const button = screen.getByRole("button");
		expect(button.className).toContain("custom-class");
	});
});
