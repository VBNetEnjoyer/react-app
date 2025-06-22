import { useHistoryStore } from "@/Modules/History/model/store/historyStore.ts";
import cls from "./RecordList.module.css";
import { historyService } from "@/Modules/History/model/services/historyService.ts";
import { RecordItem } from "@/Modules/History/ui/RecordsList/RecordItem/RecordItem.tsx";
import type { AppId } from "@/Shared/types";
import { useCallback } from "react";
import type { AnalyticsRecord } from "@/Modules/Analytics";
import { getHasAnalyticsRecords } from "@/Modules/History/model/selectors/historySelectors.ts";

export function RecordsList({ onRecordClick }: { onRecordClick: (record: AnalyticsRecord) => void }) {
	const records = useHistoryStore((state) => state.records);
	const hasAnalyticsRecords = useHistoryStore(getHasAnalyticsRecords);

	const deleteHandler = useCallback((id: AppId) => {
		historyService.deleteRecord(id);
	}, []);

	return (
		<div className={cls.root}>
			{hasAnalyticsRecords ? (
				records.map((record) => (
					<RecordItem
						key={record.id}
						record={record}
						onDelete={deleteHandler}
						onRecordClick={onRecordClick}
					/>
				))
			) : (
				<h4>Записей нет :(</h4>
			)}
		</div>
	);
}
