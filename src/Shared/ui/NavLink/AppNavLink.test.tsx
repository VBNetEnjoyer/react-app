import { MemoryRouter } from "react-router";
import { AppNavLink } from "@/Shared/ui/NavLink/AppNavLink.tsx";
import { render } from "@testing-library/react";
import cls from "./AppNavLink.module.css";

describe("AppNavLink", () => {
	it("отображает переданный текст", () => {
		const { getByText } = render(
			<MemoryRouter>
				<AppNavLink
					to="/home"
					text="Главная"
				/>
			</MemoryRouter>,
		);

		expect(getByText("Главная")).toBeInTheDocument();
	});

	it("содержит правильный href в ссылке", () => {
		const { getByRole } = render(
			<MemoryRouter>
				<AppNavLink
					to="/about"
					text="О нас"
				/>
			</MemoryRouter>,
		);

		expect(getByRole("link")).toHaveAttribute("href", "/about");
	});

	it("всегда содержит базовый класс", () => {
		const { getByRole } = render(
			<MemoryRouter>
				<AppNavLink
					to="/services"
					text="Услуги"
				/>
			</MemoryRouter>,
		);
		expect(getByRole("link").className).toContain(cls.root);
	});
});
