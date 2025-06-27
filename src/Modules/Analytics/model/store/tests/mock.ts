import { vi } from "vitest";
import { analyticsActions } from "@/Modules/Analytics/model/store/analyticsActions.ts";

export function mockAnalyticsActions() {
	return {
		setAnalyticsFile: vi.spyOn(analyticsActions, "setAnalyticsFile").mockImplementation(() => {}),
		setAnalyticsData: vi.spyOn(analyticsActions, "setAnalyticsData").mockImplementation(() => {}),
		startLoading: vi.spyOn(analyticsActions, "startLoading").mockImplementation(() => {}),
		fulfillLoading: vi.spyOn(analyticsActions, "fulfillLoading").mockImplementation(() => {}),
		rejectLoading: vi.spyOn(analyticsActions, "rejectLoading").mockImplementation(() => {}),
	};
}
