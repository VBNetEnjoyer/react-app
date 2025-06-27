import type { HistoryStoreScheme } from "@/Modules/History/model/types";
import { create } from "zustand/react";

export const useHistoryStore = create<HistoryStoreScheme>()(() => ({
	records: [],
}));
