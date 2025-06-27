import { type AnalyticsRecord, getSavedRecords } from "@/Modules/Analytics";
import { historyApi } from "../api/historyApi.ts";
import { useHistoryStore } from "../store/historyStore.ts";
import { historyActions } from "../store/historyActions.ts";

export class HistoryService {
	// наверное не стоит делать методы private, тяжело мокать в юнит тестах
	private saveRecords() {
		/*
			В общем тут чувствует моя левая нога - не правильно что сервис вообще что-то знает о сторе,
			ладно вызывать какие-то абстрактные actions, вот они пусть знают о сторе,
			но прям брать и вот так брать стейт 100% не правильно.
			Скорее всего надо передавать все данные для работы сервиса из вне.
			Но ладно один массив какой-то из вне передать, а если аргументов 5-6 понадобится...

			??? Принимать часть стейта который из вне будет загнан селектором что-то типа saveRecords(useStore(saveRecordsSelector))???
		 */
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
