import type { AnalyticsRecord } from "@/Modules/Analytics";
import { useCallback, useEffect, useState } from "react";
import { historyService } from "../../model/services/historyService.ts";
import { ButtonsRow } from "../ButtonsRow/ButtonsRow.tsx";
import { RecordModal } from "../RecordModal/RecordModal.tsx";
import { RecordsList } from "../RecordsList/RecordsList.tsx";
import cls from "./HistoryPage.module.css";

export function HistoryPage() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedRecord, setSelectedRecord] = useState<AnalyticsRecord | null>(null);

	// почему так описал в App.tsx
	useEffect(() => {
		historyService.validateRecords();
	}, []);

	const recordClickHandler = useCallback(
		(record: AnalyticsRecord) => {
			setSelectedRecord(record);
			setIsOpen(true);
		},
		[setSelectedRecord, setIsOpen],
	);

	return (
		<div className={cls.root}>
			<RecordsList onRecordClick={recordClickHandler} />
			<ButtonsRow className={cls.buttonRow} />
			<RecordModal
				selectedRecord={selectedRecord}
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			/>
		</div>
	);
}
