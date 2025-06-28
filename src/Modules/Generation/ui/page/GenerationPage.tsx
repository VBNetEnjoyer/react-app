import { useCallback, useEffect, useState } from "react";
import { AppButton } from "../../../../Shared/ui/AppButton/AppButton.tsx";
import { UploadButton, type UploadButtonStyle } from "../../../../Shared/ui/UploadButton/UploadButton.tsx";
import { generationService } from "../../model/servicies/generationService.ts";
import cls from "./GenerationPage.module.css";

export function GenerationPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [stateWithPlaceholder, setStateWithPlaceholder] = useState<
		[Extract<UploadButtonStyle, "error" | "pending" | "done">, string]
	>(["pending", ""]);

	const generateClickHandler = useCallback(async () => {
		setIsLoading(true);
		try {
			await generationService.generateFile();
			setIsSuccess(true);
		} catch {
			setHasError(true);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		if (isLoading) {
			setStateWithPlaceholder(["pending", "идёт процесс генерации"]);
		} else if (isSuccess) {
			setStateWithPlaceholder(["done", "файл сгенерирован!"]);
		} else if (hasError) {
			setStateWithPlaceholder(["error", "упс, не то..."]);
		}
	}, [isLoading, isSuccess, hasError]);

	const resetHandler = useCallback(() => {
		setIsLoading(false);
		setHasError(false);
		setIsSuccess(false);
	}, [setIsLoading, setHasError, setIsSuccess]);

	return (
		<div className={cls.root}>
			<p>Сгенерируйте готовый csv-файл нажатием одной кнопки</p>
			{isLoading || isSuccess || hasError ? (
				<UploadButton
					state={stateWithPlaceholder[0]}
					fileName={isSuccess ? "Done" : "Ошибка"}
					placeholder={stateWithPlaceholder[1]}
					onRemove={resetHandler}
				/>
			) : (
				<AppButton
					data-testid="generate-button"
					color={"green"}
					onClick={generateClickHandler}
				>
					Начать генерацию
				</AppButton>
			)}
		</div>
	);
}
