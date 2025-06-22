import { historyApi } from "@/Modules/History/model/api/historyApi.ts";
import type { HistoryStoreScheme } from "@/Modules/History/model/types";
import { create } from "zustand/react";

export const useHistoryStore = create<HistoryStoreScheme>()(() => ({
	records: historyApi.getSavedRecords(),
}));
