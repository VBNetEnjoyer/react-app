import { analyticsService } from "@/Modules/Analytics/model/services/analyticsService.ts";

export function mockAnalyticsService() {
	return {
		verifyFile: vi.spyOn(analyticsService, "verifyFile").mockImplementation(() => true),

		sendFile: vi.spyOn(analyticsService, "sendFile").mockImplementation(() => Promise.resolve()),

		setFile: vi.spyOn(analyticsService, "setFile").mockImplementation(() => {}),

		// Мокаем приватный метод через as any
		saveAnalyticsData: vi.spyOn(analyticsService as any, "saveAnalyticsData").mockImplementation(() => {}),
	};
}
