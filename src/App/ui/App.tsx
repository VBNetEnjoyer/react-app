import { BrowserRouter, Route, Routes } from "react-router";

import { AppLayout } from "@/Layouts/AppLayout/AppLayout.tsx";
import { AnalyticsPage } from "@/Modules/Analytics";
import { GenerationPage } from "@/Modules/Generation";
import { HistoryPage } from "@/Modules/History";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AppLayout />}>
					<Route
						index
						element={<AnalyticsPage />}
					/>
					<Route
						path="generation"
						element={<GenerationPage />}
					/>
					<Route
						path="history"
						element={<HistoryPage />}

						// loader={validateHistoryDataLoader}
					/>
					{/* Т.к. Мы используем BrowserMode это нам не доступно */}
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
