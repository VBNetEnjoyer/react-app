import type { AnalyticsData, AnalyticsRecord } from "@/Modules/Analytics/model/types";
import { $api } from "@/Shared/api/$api.ts";
import { $storage } from "@/Shared/storage/$storage.ts";
import { ANALYTICS_RECORDS_KEY } from "@/Shared/consts/localStorageKeys.ts";

const expectedKeys = new Set([
	"total_spend_galactic",
	"less_spent_civ",
	"rows_affected",
	"big_spent_at",
	"less_spent_at",
	"big_spent_value",
	"big_spent_civ",
	"average_spend_galactic",
	"less_spent_value",
]);

export class AnalyticsApi {
	async uploadAndAggregate(
		file: File,
		onData: (done: boolean, data: AnalyticsData | null) => any,
		onError: (err: string) => void,
	): Promise<void> {
		try {
			await $api.uploadStream<RawAnalyticsData>("/aggregate", file, { rows: 15000 }, (done, data) => {
				if (data) {
					for (const key of Object.keys(data)) {
						if (!expectedKeys.has(key)) {
							onError("Ошибка подсчета статистики");
						}
					}
					const modifiedData = {
						totalSpendGalactic: data.total_spend_galactic,
						lessSpentCiv: data.less_spent_civ,
						rowsAffected: data.rows_affected,
						bigSpentAt: data.big_spent_at,
						lessSpentAt: data.less_spent_at,
						bigSpentValue: data.big_spent_value,
						bigSpentCiv: data.big_spent_civ,
						averageSpendGalactic: data.average_spend_galactic,
					};
					onData(done, modifiedData);
				} else {
					onData(done, null);
				}
			});
		} catch {
			onError("Ошибка подсчета статистики");
		}
	}

	getSavedRecords() {
		return $storage.getValue(ANALYTICS_RECORDS_KEY, []);
	}

	saveRecords(record: AnalyticsRecord, prevRecords: AnalyticsRecord[]) {
		$storage.setValue(ANALYTICS_RECORDS_KEY, [record, ...prevRecords]);
	}
}

export const analyticsApi = new AnalyticsApi();

type RawAnalyticsData = {
	total_spend_galactic: number;
	rows_affected: number;
	less_spent_at: number;
	big_spent_at: number;
	less_spent_value: number;
	big_spent_value: number;
	average_spend_galactic: number;
	big_spent_civ: string;
	less_spent_civ: string;
};
