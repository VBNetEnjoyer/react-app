import { afterEach, beforeEach, describe, vi } from "vitest";
import { mockAnalyticsService } from "@/Modules/Analytics/model/services/tests/mock.ts";
import { useAnalyticsStore } from "@/Modules/Analytics/model/store/analyticsStore.ts";
import { fireEvent, render, screen } from "@testing-library/react";
import { AnalyticsPage } from "@/Modules/Analytics";

vi.mock("@/Modules/Analytics/ui/UploadCard/UploadCard.tsx", () => ({
	UploadCard: () => <div data-testid="mock-upload-card" />,
}));

vi.mock("@/Modules/Analytics/ui/AnalyticsList/AnalyticsList.tsx", () => ({
	AnalyticsList: () => <div data-testid="mock-analytics-list" />,
}));

const mockFile = new File(["csv content"], "test.csv", { type: "text/csv" });
describe("AnalyticsPage", () => {
	let analyticsService: ReturnType<typeof mockAnalyticsService>;

	beforeEach(() => {
		analyticsService = mockAnalyticsService();

		useAnalyticsStore.setState(() => useAnalyticsStore.getInitialState());
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("кнопка отключена, если файл не загружен", () => {
		render(<AnalyticsPage />);
		const button = screen.getByTestId("send-button");
		expect(button).toBeDisabled();
	});

	it("кнопка отключена, если isLoading = true", () => {
		useAnalyticsStore.setState(() => ({
			file: mockFile,
			isLoading: true,
		}));

		render(<AnalyticsPage />);
		const button = screen.getByTestId("send-button");
		expect(button).toBeDisabled();
	});

	it("кнопка активна, если файл загружен и не загружается", () => {
		useAnalyticsStore.setState(() => ({
			file: mockFile,
			isLoading: false,
		}));

		render(<AnalyticsPage />);
		const button = screen.getByTestId("send-button");
		expect(button).toBeEnabled();
	});

	it("при клике вызывается analyticsService.sendFile", () => {
		useAnalyticsStore.setState(() => ({
			file: mockFile,
			isLoading: false,
		}));

		render(<AnalyticsPage />);
		const button = screen.getByTestId("send-button");
		fireEvent.click(button);

		expect(analyticsService.sendFile).toHaveBeenCalledWith(mockFile);
	});
});
