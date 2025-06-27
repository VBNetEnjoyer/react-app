import { analyticsApi } from "@/Modules/Analytics/model/api/analyticsApi.ts";

export const mockAnalyticsApi = () => {
	return {
		uploadAndAggregate: vi.spyOn(analyticsApi, "uploadAndAggregate").mockImplementation(() => Promise.resolve()),
		getSavedRecords: vi.spyOn(analyticsApi, "getSavedRecords").mockImplementation(() => []),
		saveRecords: vi.spyOn(analyticsApi, "saveRecords").mockImplementation(() => {}),
	};
};
