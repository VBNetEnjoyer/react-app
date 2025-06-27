import { beforeEach, describe, expect, it, vi } from "vitest";
import { $api } from "./$api.ts";

const jsonLines = [JSON.stringify({ value: 1 }), JSON.stringify({ value: 2 }), JSON.stringify({ value: 3 })];

const createNewStream = () => {
	let index = 0;
	const stream = new ReadableStream({
		start(controller) {
			function pushLine() {
				if (index < jsonLines.length) {
					const line = jsonLines[index++] + "\n";
					const encoded = new TextEncoder().encode(line);
					controller.enqueue(encoded);
					setTimeout(pushLine); // симулируем задержку как в реальном стриме
				} else {
					controller.close();
				}
			}

			pushLine();
		},
	});
	return stream;
};

describe("$api - API для работы с сервером", () => {
	beforeEach(() => {
		// что бы ошибка не падала в консоль
		vi.spyOn(console, "error").mockImplementation(() => {});
	});

	it("Отправляет файл на сервер и проверяет что считывается весь поток в ответе", async () => {
		const url = "/upload";
		const file = new File(["test"], "test.txt");
		const params = { rows: 10000 };
		const onData = vi.fn();
		const stream = createNewStream();

		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			body: stream,
		});

		await $api.uploadStream(url, file, params, onData);

		expect(onData).toHaveBeenCalledTimes(4);
		expect(onData).toHaveBeenNthCalledWith(1, false, { value: 1 });
		expect(onData).toHaveBeenNthCalledWith(2, false, { value: 2 });
		expect(onData).toHaveBeenNthCalledWith(3, false, { value: 3 });
		expect(onData).toHaveBeenLastCalledWith(true, null);
	});

	it("Запрос на загрузку выбрасывает ошибку, если fetch возвращает не ok", async () => {
		global.fetch = vi.fn().mockResolvedValue({
			ok: false,
		} as unknown as Response);

		const file = new File(["data"], "file.txt", { type: "text/plain" });
		const onData = vi.fn();

		await expect($api.uploadStream("bad-url", file, {}, onData)).rejects.toThrow();
		expect(onData).not.toHaveBeenCalled();
	});

	it("Запрос на скачивание файла. После получения ответа происходит скачивание файла", async () => {
		const mockBlob = new Blob(["test data"], { type: "text/csv" });
		global.fetch = vi.fn().mockResolvedValue({
			blob: vi.fn().mockResolvedValue(mockBlob),
		} as unknown as Response);

		const mockDownloadUrl = "blob:http://localhost/fake";
		global.URL.createObjectURL = vi.fn().mockReturnValue(mockDownloadUrl);
		global.URL.revokeObjectURL = vi.fn();

		await $api.downloadFile("test-url", { q: 1 });

		expect(global.fetch).toHaveBeenCalledWith("http://localhost:3000/test-url?q=1", {
			method: "GET",
		});

		expect(URL.createObjectURL).toHaveBeenCalledWith(mockBlob);
		expect(URL.revokeObjectURL).toHaveBeenCalledWith(mockDownloadUrl);
	});
});
