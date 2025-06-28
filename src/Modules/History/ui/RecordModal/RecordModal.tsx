import { Modal } from "@/Shared/ui/Modal/Modal.tsx";
import { PropertyRow } from "@/Shared/ui/PropertyRow/PropertyRow.tsx";
import type { AnalyticsRecord } from "../../../Analytics";
import cls from "./RecordModal.module.css";

type RecordModalProps = {
	isOpen: boolean;
	onClose: () => void;
	selectedRecord: AnalyticsRecord | null;
};

export function RecordModal(props: RecordModalProps) {
	const { isOpen, onClose, selectedRecord } = props;
	if (selectedRecord && selectedRecord.data) {
		return (
			<Modal
				isOpen={isOpen}
				onClose={onClose}
			>
				<div className={cls.content}>
					{Object.entries(selectedRecord.data).map(([key, value]) => (
						<PropertyRow
							key={key}
							title={key}
							value={value}
							isModal={true}
						/>
					))}
				</div>
			</Modal>
		);
	} else {
		return null;
	}
}
