import { PropertyRow } from "@/Shared/ui/PropertyRow/PropertyRow.tsx";
import cls from "./AnalyticsList.module.css";
import { useAnalyticsStore } from "@/Modules/Analytics/model/store/analyticsStore.ts";

export function AnalyticsList() {
	const { data: analyticsRecords } = useAnalyticsStore((state) => state);

	if (!analyticsRecords) {
		return (
			<div className={cls.emptyList}>
				<p>
					Здесь <br /> появятся хайлайты
				</p>
			</div>
		);
	} else {
		return (
			<div className={cls.root}>
				{Object.entries(analyticsRecords).map(([key, value]) => (
					<PropertyRow
						key={key}
						title={key}
						value={value}
					/>
				))}
			</div>
		);
	}
}
