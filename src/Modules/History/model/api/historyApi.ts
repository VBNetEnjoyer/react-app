import { ANALYTICS_RECORDS_KEY } from "@/Shared/consts/localStorageKeys.ts";
import { $storage } from "@/Shared/storage/$storage.ts";
import type { AnalyticsRecord } from "@/Modules/Analytics";

export const historyApi = {
	saveRecord(records: AnalyticsRecord[]) {
		$storage.setValue(ANALYTICS_RECORDS_KEY, records);
	},
};
