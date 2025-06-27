import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { AppLayout } from "@/Layouts/AppLayout/AppLayout.tsx";

function renderWithRoutes(initialRoute: string = "/") {
	return render(
		<MemoryRouter initialEntries={[initialRoute]}>
			<Routes>
				<Route
					path="/"
					element={<AppLayout />}
				>
					<Route
						index
						element={<div>Страница аналитики</div>}
					/>
					<Route
						path="generation"
						element={<div>Страница генератора</div>}
					/>
					<Route
						path="history"
						element={<div>Страница истории</div>}
					/>
				</Route>
			</Routes>
		</MemoryRouter>,
	);
}

describe("AppLayout", () => {
	it("отображает логотип и заголовок", () => {
		renderWithRoutes();
		expect(screen.getByRole("img")).toBeInTheDocument();
		expect(screen.getByText("МЕЖГАЛАКТИЧЕСКАЯ АНАЛИТИКА")).toBeInTheDocument();
	});

	it("отображает все ссылки навигации", () => {
		renderWithRoutes();
		expect(screen.getByTestId("analytics-link")).toBeInTheDocument();
		expect(screen.getByTestId("generation-link")).toBeInTheDocument();
		expect(screen.getByTestId("history-link")).toBeInTheDocument();
	});

	it("по умолчанию отображает страницу аналитики", () => {
		renderWithRoutes("/");
		expect(screen.getByText("Страница аналитики")).toBeInTheDocument();
	});

	it("переключается на страницу аналитики при клике", () => {
		renderWithRoutes("/generation");
		fireEvent.click(screen.getByTestId("analytics-link"));
		expect(screen.getByText("Страница аналитики")).toBeInTheDocument();
	});

	it("переключается на страницу генератора при клике", () => {
		renderWithRoutes("/");
		fireEvent.click(screen.getByTestId("generation-link"));
		expect(screen.getByText("Страница генератора")).toBeInTheDocument();
	});

	it("переключается на страницу истории при клике", () => {
		renderWithRoutes("/");
		fireEvent.click(screen.getByTestId("history-link"));
		expect(screen.getByText("Страница истории")).toBeInTheDocument();
	});
});
