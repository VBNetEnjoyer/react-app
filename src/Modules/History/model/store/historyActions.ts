import type { AppId } from "../../../../Shared/types";
import type { AnalyticsRecord } from "../../../Load";
import { useHistoryStore } from "./historyStore.ts";

export const historyActions = {
	setRecord(records: AnalyticsRecord[]) {
		useHistoryStore.setState((state) => ({
			...state,
			records,
		}));
	},

	deleteRecord(recordId: AppId) {
		useHistoryStore.setState((state) => ({
			...state,
			records: state.records.filter((record) => record.id !== recordId),
		}));
	},

	clearRecords() {
		useHistoryStore.setState((state) => ({
			...state,
			records: [],
		}));
	},
};
