import { UploadCard } from "@/Modules/Analytics/ui/UploadCard/UploadCard.tsx";
import { AppButton } from "@/Shared/ui/AppButton/AppButton.tsx";
import cls from "./AnalyticsPage.module.css";
import { analyticsService } from "@/Modules/Analytics/model/services/analyticsService.ts";
import { AnalyticsList } from "@/Modules/Analytics/ui/AnalyticsList/AnalyticsList.tsx";
import { useAnalyticsStore } from "@/Modules/Analytics/model/store/analyticsStore.ts";

export function AnalyticsPage() {
	const { file, isLoading } = useAnalyticsStore((state) => state);

	const allowSend = Boolean(file) && !isLoading;

	const onClick = () => {
		if (allowSend) {
			analyticsService.sendFile(file!);
		}
	};

	return (
		<div className={cls.root}>
			<p className={cls.title}>
				Загрузите <b>csv</b> файл и получите <b>полную информацию</b> о нём за сверхнизкое время
			</p>
			<UploadCard />
			<AppButton
				className={cls.sendButton}
				color={"green"}
				disabled={!allowSend}
				onClick={onClick}
			>
				Отправить
			</AppButton>

			<AnalyticsList />
		</div>
	);
}
