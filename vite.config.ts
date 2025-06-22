import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "node:path";

const ReactCompilerConfig = {
	target: "19",
};

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
			},
		}),
	],
	resolve: {
		extensions: [".ts", ".tsx", ".css"],
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
});
