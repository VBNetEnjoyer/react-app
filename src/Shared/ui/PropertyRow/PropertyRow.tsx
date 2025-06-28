import classNames from "classnames";
import cls from "./PropertyRow.module.css";
import type { AnalyticsData } from "@/Modules/Analytics";

type PropertyRowProps = {
	title: keyof AnalyticsData | string;
	value: string | number;
	isModal?: boolean;
};

const displayValues: Record<keyof AnalyticsData | string, string> = {
	averageSpendGalactic: "средние расходы в галактических кредитах",
	bigSpentAt: "день года с максимальными расходами",
	bigSpentValue: "максимальная сумма расходов за день",
	bigSpentCiv: "цивилизация с максимальными расходами",
	lessSpentAt: "день года с минимальными расходами",
	lessSpentCiv: "цивилизация с минимальными расходами",
	rowsAffected: "количество обработанных записей",
	totalSpendGalactic: "общие расходы в галактических кредитах",
};

export function PropertyRow(props: PropertyRowProps) {
	const { title, value, isModal, ...rest } = props;
	return (
		<div
			{...rest}
			className={classNames(cls.root, { [cls.modal]: isModal })}
		>
			<h4>{value}</h4>
			<p>{displayValues[title]}</p>
		</div>
	);
}
