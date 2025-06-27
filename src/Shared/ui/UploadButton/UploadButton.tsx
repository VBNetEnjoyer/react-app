import { type HTMLAttributes, useRef } from "react";
import cls from "./UploadButton.module.css";
import { SquareButton } from "@/Shared/ui/IconButton/SquareButton.tsx";
import classNames from "classnames";
import { CrossIcon } from "@/Shared/ui/Icons/CrossIcon.tsx";

export type UploadButtonStyle = "waiting" | "loaded" | "error" | "pending" | "done";
type UploadButtonProps = {
	state: UploadButtonStyle;
	fileName?: string;
	placeholder?: string;
	onUploaded?: (uploadedFile: File) => any;
	onRemove?: () => any;
} & HTMLAttributes<HTMLElement>;

export function UploadButton(props: UploadButtonProps) {
	const { state = "waiting", fileName, placeholder, onUploaded, onRemove } = props;
	const fileInputRef = useRef<HTMLInputElement>(null);

	const getInnerPlaceholder = () => {
		switch (state) {
			case "waiting":
				return "или перетащите сюда";
			case "error":
				return "Упс, не то...";
			case "pending":
				return "Идёт парсинг файла";
			case "loaded":
				return "Файл загружен!";
			case "done":
				return "Готово!";
		}
	};
	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const uploadedFile = event.target.files?.[0];

		if (uploadedFile) {
			onUploaded?.(uploadedFile);
		}
	};

	const handleRemoveFile = () => {
		onRemove?.();
		fileInputRef.current!.value = "";
	};
	return (
		<>
			<input
				data-testid="file-input"
				type="file"
				accept=".csv"
				ref={fileInputRef}
				onChange={handleFileChange}
				style={{ display: "none" }}
			/>

			<div className={cls.infoWrapper}>
				{state === "waiting" ? (
					<>
						<div
							onClick={handleUploadClick}
							className={classNames([cls.uploadButton, cls.infoColumn])}
						>
							Загрузить файл
						</div>
						<span>{getInnerPlaceholder()}</span>
					</>
				) : (
					<>
						<div className={cls.infoRow}>
							<div className={classNames([cls.infoColumn, cls[state]])}>
								{state === "pending" ? (
									<div
										className={cls.spinner}
										data-testid="upload-button-spinner"
									></div>
								) : (
									fileName
								)}
							</div>

							{(state === "loaded" || state === "error" || state === "done") && (
								<SquareButton onClick={handleRemoveFile}>
									<CrossIcon />
								</SquareButton>
							)}
						</div>
						<span
							className={cls.message}
							style={{ color: state === "error" ? "#FF5F00" : "" }}
						>
							{placeholder || getInnerPlaceholder()}
						</span>
					</>
				)}
			</div>
		</>
	);
}
