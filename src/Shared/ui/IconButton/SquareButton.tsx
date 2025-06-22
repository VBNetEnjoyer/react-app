import type { ButtonHTMLAttributes, ReactNode } from "react";
import cls from "./SquareButton.module.css";
import classNames from "classnames";
import type { EnumOf } from "@/Shared/lib/enumOf.ts";

export const SquareButtonColor = {
	white: "white",
	black: "black",
} as const;
export type SquareButtonColor = EnumOf<typeof SquareButtonColor>;
export const SquareButtonSize = {
	s: "s",
	m: "m",
} as const;
export type SquareButtonSize = EnumOf<typeof SquareButtonSize>;

type SquareButtonProps = {
	className?: string;
	children?: ReactNode;
	disabled?: boolean;
	color?: SquareButtonColor;
	size?: SquareButtonSize;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function SquareButton(props: SquareButtonProps) {
	const { className, children, color = "black", size = "s", disabled, ...rest } = props;

	return (
		<button
			{...rest}
			className={classNames([cls.root, props.className, cls[color], cls[size]])}
		>
			{children}
		</button>
	);
}
