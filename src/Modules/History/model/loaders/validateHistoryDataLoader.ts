import { historyService } from "../services/historyService.ts";

export const validateHistoryDataLoader = () => {
	historyService.validateRecords();
};
