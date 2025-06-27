import { analyticsApi } from "@/Modules/Analytics/model/api/analyticsApi.ts";
import { analyticsActions } from "@/Modules/Analytics/model/store/analyticsActions.ts";
import type { AnalyticsData, AnalyticsRecord } from "@/Modules/Analytics/model/types";
import { useAnalyticsStore } from "@/Modules/Analytics/model/store/analyticsStore.ts";

export class AnalyticsService {
	/* qs:
		Допустим в приложении еще где-то будет возможность загрузить файл и нам надо так же проверить его на какие-то условия.
		Получается вот эта верификация переезжает в условный CSVFilesService
		Можно ли использовать сервис в сервисе? -> Иерархия сервисов?

		Иерархия сервисов:
		Глупый сервис который не дергает стор, может быть использован в другом сервисе поумнее?
	 */
	verifyFile(file?: File | null) {
		// Отсутствие файла возможно
		if (!file) return true;

		// Проверка, что это csv
		const splittedName = file.name.split(".");
		if (splittedName[splittedName.length - 1] !== "csv") {
			return false;
		}

		return true;
	}

	async sendFile(file: File) {
		analyticsActions.startLoading();

		const onData = (done: boolean, data: AnalyticsData | null) => {
			if (data) analyticsActions.setAnalyticsData(data);
			if (done) {
				analyticsActions.fulfillLoading();
			}
		};

		const onError = () => {
			analyticsActions.rejectLoading();
		};

		await analyticsApi.uploadAndAggregate(file, onData, onError);

		this.saveAnalyticsData();
	}

	private saveAnalyticsData() {
		const analytics = useAnalyticsStore.getState();

		const prevRecords = analyticsApi.getSavedRecords();
		const record: AnalyticsRecord = {
			id: window.crypto.randomUUID(),
			isSuccess: analytics.done,
			fileName: analytics.file!.name,
			date: new Date(),
			data: analytics.done ? analytics.data! : undefined,
		};

		analyticsApi.saveRecords(record, prevRecords);
	}
}

export const analyticsService = new AnalyticsService();
