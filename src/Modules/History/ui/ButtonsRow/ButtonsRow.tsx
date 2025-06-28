import { getHasAnalyticsRecords } from "@/Modules/History/model/selectors/historySelectors.ts";
import { historyService } from "@/Modules/History/model/services/historyService.ts";
import { useHistoryStore } from "@/Modules/History/model/store/historyStore.ts";
import { AppButton } from "@/Shared/ui/AppButton/AppButton.tsx";
import { useCallback } from "react";
import { NavLink } from "react-router";

export function ButtonsRow({ className }: { className: string }) {
	const hasAnalyticsRecords = useHistoryStore(getHasAnalyticsRecords);

	const deleteAllHandler = useCallback(() => {
		historyService.clearRecords();
	}, []);

	const generateMoreButton = (
		<NavLink to={"/generation"}>
			<AppButton data-testid="generate-more-button">
				{hasAnalyticsRecords ? "Сгенерировать больше" : "Сгенерировать"}
			</AppButton>
		</NavLink>
	);

	if (hasAnalyticsRecords) {
		return (
			<div className={className}>
				{generateMoreButton}{" "}
				<AppButton
					data-testid="clear-all-button"
					color={"black"}
					onClick={deleteAllHandler}
				>
					Очистить всё
				</AppButton>
			</div>
		);
	} else {
		return <div className={className}>{generateMoreButton}</div>;
	}
}
