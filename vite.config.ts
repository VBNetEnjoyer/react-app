/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import * as path from "node:path";

const ReactCompilerConfig = {
	target: "19",
};

// https://vite.dev/config/
export default defineConfig({
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./src/Config/tests/setup.ts"],
		coverage: {
			exclude: ["tests/mock.ts", "__mock__", "index.ts", "*.config.*", "main.tsx"],
		},
	},
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
