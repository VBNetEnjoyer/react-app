import type { ButtonHTMLAttributes, ReactNode } from "react";
import cls from "./AppButton.module.css";
import classNames from "classnames";
import type { EnumOf } from "@/Shared/lib/enumOf.ts";

export const AppButtonColors = {
	green: "green",
	black: "black",
} as const;
export type AppButtonColors = EnumOf<typeof AppButtonColors>;

type AppButtonProps = {
	className?: string;
	children?: ReactNode;
	disabled?: boolean;
	color?: AppButtonColors;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function AppButton(props: AppButtonProps) {
	const { className, children, color = "green", disabled, ...rest } = props;

	return (
		<button
			{...rest}
			disabled={disabled}
			className={classNames([cls.root, className, cls[color]], { [cls.stateDisabled]: disabled })}
		>
			{children}
		</button>
	);
}
