import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Modal } from "@/Shared/ui/Modal/Modal.tsx";

describe("Modal", () => {
	let onClose: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		onClose = vi.fn();
	});

	it("не отображается, если isOpen = false", () => {
		render(
			<Modal
				isOpen={false}
				onClose={onClose}
			>
				Контент
			</Modal>,
		);
		expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
	});

	it("отображается, если isOpen = true", () => {
		render(
			<Modal
				isOpen={true}
				onClose={onClose}
			>
				Контент
			</Modal>,
		);
		expect(screen.getByTestId("modal")).toBeInTheDocument();
		expect(screen.getByText("Контент")).toBeInTheDocument();
	});

	it("вызывает onClose при нажатии клавиши Escape", async () => {
		render(
			<Modal
				isOpen={true}
				onClose={onClose}
			>
				Контент
			</Modal>,
		);
		fireEvent.keyDown(window, { key: "Escape" });
		await waitFor(() => expect(onClose).toHaveBeenCalled());
	});

	it("вызывает onClose при клике по оверлею", async () => {
		render(
			<Modal
				isOpen={true}
				onClose={onClose}
			>
				Контент
			</Modal>,
		);
		fireEvent.click(screen.getByTestId("modal-overlay"));
		await waitFor(() => expect(onClose).toHaveBeenCalled());
	});

	it("не вызывает onClose при клике по контенту", () => {
		render(
			<Modal
				isOpen={true}
				onClose={onClose}
			>
				Контент
			</Modal>,
		);
		fireEvent.click(screen.getByTestId("modal-content"));
		expect(onClose).not.toHaveBeenCalled();
	});

	it("вызывает onClose при клике на кнопку закрытия", async () => {
		render(
			<Modal
				isOpen={true}
				onClose={onClose}
			>
				Контент
			</Modal>,
		);
		fireEvent.click(screen.getByTestId("modal-close-button"));
		await waitFor(() => expect(onClose).toHaveBeenCalled());
	});

	it("добавляет CSS-класс opened при открытии", () => {
		render(
			<Modal
				isOpen={true}
				onClose={onClose}
			>
				Контент
			</Modal>,
		);
		expect(screen.getByTestId("modal").className).toContain("opened");
	});
});
