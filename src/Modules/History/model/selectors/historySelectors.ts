import type { HistoryStoreScheme } from "@/Modules/History/model/types";

export const getHasAnalyticsRecords = (state: HistoryStoreScheme) => state.records.length > 0;
