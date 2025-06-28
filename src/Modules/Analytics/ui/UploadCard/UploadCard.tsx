import { useCallback, useEffect, useRef, useState } from "react";
import { UploadButton, type UploadButtonStyle } from "@/Shared/ui/UploadButton/UploadButton.tsx";
import { type AnalyticsSliceScheme } from "../../model/types";
import cls from "./UploadCard.module.css";
import classNames from "classnames";
import { useAnalyticsStore } from "@/Modules/Analytics/model/store/analyticsStore.ts";
import { analyticsService } from "@/Modules/Analytics/model/services/analyticsService.ts";

export function UploadCard() {
	const analytics = useAnalyticsStore((state) => state);

	const [cardState, setCardState] = useState<UploadButtonStyle>("waiting");

	const uploadCardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		uploadCardRef.current?.addEventListener("drop", dropHandler);
		uploadCardRef.current?.addEventListener("dragover", dragOverHandler);
		uploadCardRef.current?.addEventListener("dragenter", dragEnterHandler);
		uploadCardRef.current?.addEventListener("dragleave", dragLeaveHandler);

		return () => {
			uploadCardRef.current?.removeEventListener("drop", dropHandler);
			uploadCardRef.current?.removeEventListener("dragover", dragOverHandler);
			uploadCardRef.current?.removeEventListener("dragenter", dragEnterHandler);
			uploadCardRef.current?.removeEventListener("dragleave", dragLeaveHandler);
		};
	}, []);

	useEffect(() => {
		if (analytics.hasError) {
			setCardState("error");
		} else if (analytics.isLoading) {
			setCardState("pending");
		} else if (analytics.done) {
			setCardState("done");
		} else if (!analytics.file) {
			setCardState("waiting");
		} else if (analytics.file) {
			setCardState("loaded");
		}
	}, [analytics, setCardState]);

	const dragOverHandler = useCallback((e: DragEvent) => {
		e.preventDefault();
	}, []);

	const dropHandler = useCallback((e: DragEvent) => {
		e.preventDefault();
		resetCardBackground();
		const file = e.dataTransfer?.files[0];

		if (file) {
			analyticsService.setFile(file);
		}
	}, []);

	const dragEnterHandler = useCallback(() => {
		uploadCardRef.current!.style.background = "#D4FAE6";
	}, []);

	const dragLeaveHandler = useCallback((e: DragEvent) => {
		e.preventDefault();

		const card = uploadCardRef.current;
		const relatedTarget = e.relatedTarget as Node | null;

		// Если курсор не ушёл за пределы карточки (например, переместился внутрь дочернего элемента), не сбрасываем фон
		if (card && relatedTarget && card.contains(relatedTarget)) {
			return;
		}

		if (card) {
			resetCardBackground();
		}
	}, []);

	const resetCardBackground = () => {
		if (uploadCardRef.current) {
			uploadCardRef.current.style.background = "";
		}
	};

	const uploadedHandler = (file: AnalyticsSliceScheme["file"]) => {
		analyticsService.setFile(file);
	};

	const removeHandler = () => {
		analyticsService.setFile(undefined);
	};

	return (
		<div
			data-testid="upload-card"
			className={classNames([cls.card, cls[cardState]])}
			ref={uploadCardRef}
		>
			<UploadButton
				onUploaded={uploadedHandler}
				onRemove={removeHandler}
				state={cardState}
				fileName={analytics.file?.name}
			/>
		</div>
	);
}
