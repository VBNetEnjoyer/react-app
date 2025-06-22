import { AppNavLink } from "@/Shared/ui/NavLink/AppNavLink.tsx";
import { Outlet } from "react-router";
import { GenerationIcon } from "../../Shared/ui/Icons/GenerationIcon.tsx";
import { HistoryIcon } from "../../Shared/ui/Icons/HistoryIcon.tsx";
import { UploadIcon } from "../../Shared/ui/Icons/UploadIcon.tsx";
import logo from "@/Shared/assets/imgs/logo.png";
import cls from "./AppLayout.module.css";

export function AppLayout() {
	return (
		<div className={cls.root}>
			<div className={cls.header}>
				<div className={cls.headerLogo}>
					<img
						src={logo}
						height={40}
					/>

					<h1>МЕЖГАЛАКТИЧЕСКАЯ АНАЛИТИКА</h1>
				</div>
				<nav className={cls.headerNavigation}>
					<AppNavLink
						to="/"
						text="CSV Аналитик"
						icon={
							<UploadIcon
								height={18}
								width={18}
							/>
						}
					/>

					<AppNavLink
						to="generation"
						text="CSV Генератор"
						icon={
							<GenerationIcon
								height={18}
								width={18}
							/>
						}
					/>

					<AppNavLink
						to="history"
						text="История"
						icon={
							<HistoryIcon
								height={18}
								width={18}
							/>
						}
					/>
				</nav>
			</div>
			<main className={cls.main}>
				<Outlet />
			</main>
		</div>
	);
}
