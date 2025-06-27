import { type AnalyticsRecord, getSavedRecords } from "@/Modules/Analytics";
import { historyApi } from "../api/historyApi.ts";
import { useHistoryStore } from "../store/historyStore.ts";
import { historyActions } from "../store/historyActions.ts";

export class HistoryService {
	private saveRecords() {
		const records = useHistoryStore.getState().records;
		historyApi.saveRecord(records);
	}

	getSavedRecords() {
		return getSavedRecords();
	}

	/** Обновляет данные о записях в сторе */
	validateRecords() {
		historyActions.setRecord(this.getSavedRecords());
	}

	deleteRecord(id: AnalyticsRecord["id"]) {
		historyActions.deleteRecord(id);
		this.saveRecords();
	}

	clearRecords() {
		historyActions.clearRecords();
		this.saveRecords();
	}
}

export const historyService = new HistoryService();
