import type { AnalyticsSliceScheme } from "@/Modules/Analytics/model/types";
import { create } from "zustand/react";

export const useAnalyticsStore = create<AnalyticsSliceScheme>()(() => ({
	done: false,
}));
