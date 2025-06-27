import classNames from "classnames";
import { type ReactElement } from "react";
import { NavLink, type To } from "react-router";
import cls from "./AppNavLink.module.css";

export function AppNavLink(props: { to: To; text: string; icon?: ReactElement }) {
	const { to, text, icon, ...rest } = props;
	const getClassNames = ({ isActive }: { isActive: boolean }) => {
		return classNames(cls.root, { [cls.active]: isActive });
	};

	return (
		<NavLink
			{...rest}
			to={to}
			className={getClassNames}
		>
			<>
				{icon} <span>{text}</span>
			</>
		</NavLink>
	);
}
