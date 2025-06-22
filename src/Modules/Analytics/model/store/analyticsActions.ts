import { analyticsService } from "@/Modules/Analytics/model/services/analyticsService.ts";
import type { AnalyticsData, AnalyticsSliceScheme } from "@/Modules/Analytics/model/types";
import { useAnalyticsStore } from "@/Modules/Analytics/model/store/analyticsStore.ts";

export const analyticsActions = {
	setAnalyticsFile(file: AnalyticsSliceScheme["file"]) {
		const result = analyticsService.verifyFile(file);
		if (result) {
			useAnalyticsStore.setState((state) => ({
				...state,
				file: file,
				data: undefined,
				done: false,
				isLoading: false,
				hasError: false,
			}));
		}
	},
	setAnalyticsData(analyticsData: AnalyticsData) {
		useAnalyticsStore.setState((state) => ({
			...state,
			data: analyticsData,
		}));
	},
	startLoading() {
		useAnalyticsStore.setState((state) => ({
			...state,
			done: false,
			isLoading: true,
			hasError: false,
		}));
	},
	fulfillLoading() {
		useAnalyticsStore.setState((state) => ({
			...state,
			done: true,
			isLoading: false,
			hasError: false,
		}));
	},
	rejectLoading() {
		useAnalyticsStore.setState((state) => ({
			...state,
			done: false,
			isLoading: false,
			hasError: true,
		}));
	},
};
