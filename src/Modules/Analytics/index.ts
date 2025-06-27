import { analyticsApi } from "@/Modules/Analytics/model/api/analyticsApi.ts";

export type { AnalyticsRecord, AnalyticsData } from "@/Modules/Analytics/model/types";
export { AnalyticsPage } from "@/Modules/Analytics/ui/Page/AnalyticsPage.tsx";
export const getSavedRecords = analyticsApi.getSavedRecords;
