import { createUrlWithParams } from "@/Shared/lib/createUrlWithParams/createUrlWithParams.ts";

const prefix = "http://localhost:3000";

export const $api = {
	async uploadStream<T>(
		url: string | URL,
		file: File,
		params: Record<string, any>,
		onData: (done: boolean, data: T | null) => any,
	) {
		try {
			const urlObj = createUrlWithParams(url, params, prefix);

			const formData = new FormData();
			formData.append("file", file);

			const response = await fetch(urlObj.toString(), {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error("Ошибка запроса");
			}

			const reader = response.body!.getReader();
			const decoder = new TextDecoder("utf-8");
			let buffer = "";

			while (true) {
				const { done, value } = await reader.read();

				if (value) {
					buffer += decoder.decode(value, { stream: true });

					const lines = buffer.split("\n");
					buffer = lines.pop()!;

					for (const line of lines) {
						if (line.trim()) {
							const json = JSON.parse(line);
							onData(false, json);
						}
					}
				}

				if (done) {
					buffer += decoder.decode(undefined, { stream: false });
					if (buffer.trim()) {
						const json = JSON.parse(buffer);
						onData(true, json);
					} else {
						onData(true, null);
					}

					break;
				}
			}
			reader.cancel();
			reader.releaseLock();
		} catch (error) {
			console.error(error);
			throw new Error("Ошибка запроса");
		}
	},

	async downloadFile(url: string | URL, params: Record<string, any>) {
		const urlObj = createUrlWithParams(url, params, prefix);

		const response = await fetch(urlObj.toString(), {
			method: "GET",
		});

		const blob = await response.blob();
		const downloadUrl = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = downloadUrl;
		a.download = "generated.csv";

		document.body.appendChild(a);
		a.click();
		a.remove();
		window.URL.revokeObjectURL(downloadUrl);
	},
};
