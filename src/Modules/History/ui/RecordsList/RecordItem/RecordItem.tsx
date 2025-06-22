import classNames from "classnames";
import { SmileIcon } from "@/Shared/ui/Icons/SmileIcon.tsx";
import { SmileSadIcon } from "@/Shared/ui/Icons/SmileSadIcon.tsx";
import type { AnalyticsRecord } from "@/Modules/Analytics";
import cls from "./RecordItem.module.css";
import { SquareButton } from "@/Shared/ui/IconButton/SquareButton.tsx";
import { TrashIcon } from "@/Shared/ui/Icons/TrashIcon.tsx";
import type { AppId } from "@/Shared/types";
import { useCallback } from "react";

export function RecordItem(props: {
	record: AnalyticsRecord;
	onDelete: (id: AppId) => any;
	onRecordClick: (record: AnalyticsRecord) => void;
}) {
	const { record, onRecordClick, onDelete } = props;

	const recordClickHandler = useCallback(() => {
		if (record.isSuccess) {
			onRecordClick(record);
		}
	}, [onRecordClick, record]);

	return (
		<div className={cls.row}>
			{/* ---- */}
			{/* Ну это тоже можно вынести отдельно, но мне лень :c */}
			<div
				className={cls.record}
				onClick={recordClickHandler}
			>
				<div>{record.fileName}</div>
				<div>{record.date.toLocaleDateString()}</div>
				<div
					className={classNames(cls.recordState, {
						[cls.recordStateDisabled]: !record.isSuccess,
					})}
				>
					<span>Обработано успешно</span> <SmileIcon />
				</div>
				<div className={classNames(cls.recordState, { [cls.recordStateDisabled]: record.isSuccess })}>
					<span>Не удалось обработать</span> <SmileSadIcon />
				</div>
			</div>
			{/* ---- */}
			<SquareButton
				color={"white"}
				size={"m"}
				onClick={() => {
					onDelete(record.id);
				}}
			>
				<TrashIcon
					width={24}
					height={24}
				/>
			</SquareButton>
		</div>
	);
}
