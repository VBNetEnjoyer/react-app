import { beforeEach, describe, expect } from "vitest";
import { useAnalyticsStore } from "@/Modules/Analytics/model/store/analyticsStore";
import { render, screen } from "@testing-library/react";
import { AnalyticsList } from "@/Modules/Analytics/ui/AnalyticsList/AnalyticsList.tsx";
import type { AnalyticsData } from "@/Modules/Analytics";

describe("AnalyticsList", () => {
	beforeEach(() => {
		useAnalyticsStore.setState(() => useAnalyticsStore.getInitialState());
	});

	it("не показывает строки с данными если аналитики нет", () => {
		useAnalyticsStore.setState(() => ({ data: undefined }));

		render(<AnalyticsList />);

		expect(screen.queryByTestId("property-row")).not.toBeInTheDocument();
	});

	it("Рендерит все поля из данных", () => {
		const fakeData = {
			averageSpendGalactic: 123.45,
			bigSpentAt: 12,
			bigSpentValue: 999.99,
		} as AnalyticsData;
		useAnalyticsStore.setState(() => ({ data: fakeData }));

		render(<AnalyticsList />);

		expect(screen.getAllByTestId("property-row")).toHaveLength(3);
	});
});
