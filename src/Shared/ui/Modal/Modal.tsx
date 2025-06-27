import classNames from "classnames";
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { SquareButton } from "../IconButton/SquareButton.tsx";
import { CrossIcon } from "../Icons/CrossIcon.tsx";
import cls from "./Modal.module.css";

export interface ModalProps {
	className?: string;
	children: ReactNode;
	isOpen: boolean;
	onClose?: () => void;
}

const ANIMATION_DELAY = 200;

export function Modal(props: ModalProps) {
	const { className, children, isOpen, onClose, ...otherProps } = props;
	const [isMounted, setMounted] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const timeRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	useEffect(() => {
		if (isOpen) {
			setMounted(true);
		}
	}, [isOpen]);

	const closeHandler = useCallback(() => {
		if (onClose) {
			setIsClosing(true);
			timeRef.current = setTimeout(() => {
				onClose();
				setIsClosing(false);
			}, ANIMATION_DELAY);
		}
	}, [onClose]);

	const keydownHandler = useCallback(
		(e: KeyboardEvent): void => {
			if (e.key === "Escape") {
				closeHandler();
			}
		},
		[closeHandler],
	);

	useEffect(() => {
		if (isOpen) {
			window.addEventListener(`keydown`, keydownHandler);
		}

		return () => {
			window.removeEventListener("keydown", keydownHandler);
			clearTimeout(timeRef.current);
		};
	}, [isOpen, keydownHandler]);

	const mods = {
		[cls.opened]: isOpen,
		[cls.isClosing]: isClosing,
	};

	if (!isMounted) {
		return null;
	}

	const modal = (
		<div
			className={classNames(cls.Modal, mods, [className])}
			data-testid="modal"
			{...otherProps}
		>
			<div
				className={classNames(cls.overlay)}
				data-testid="modal-overlay"
				onClick={closeHandler}
			>
				<div
					className={classNames(cls.content)}
					data-testid="modal-content"
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					<SquareButton
						data-testid="modal-close-button"
						className={classNames(cls.closeButton)}
						onClick={closeHandler}
					>
						<CrossIcon />
					</SquareButton>
					{children}
				</div>
			</div>
		</div>
	);

	return ReactDOM.createPortal(modal, document.body);
}
