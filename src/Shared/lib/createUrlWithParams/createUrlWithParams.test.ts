import { createUrlWithParams } from "./createUrlWithParams";

describe("createUrlWithParams - Создает ссылку с переданными параметрами", () => {
	it("Устанавливает переданные параметры", () => {
		const url = "http://example.com";
		const params = {
			foo: "bar",
			baz: "boo",
		};

		const result = createUrlWithParams(url, params);

		expect(result.searchParams.get("foo")).toBe("bar");
		expect(result.searchParams.get("baz")).toBe("boo");
	});

	it("Игнорирует при установке undefined и null", () => {
		const url = "http://example.com";
		const params = {
			foo: undefined,
			baz: null,
		};

		const result = createUrlWithParams(url, params);

		expect(result.searchParams.get("foo")).toBeNull();
		expect(result.searchParams.get("baz")).toBeNull();
	});

	it("Обрабатывает ссылки с уже установленными query параметрами", () => {
		const url = "http://example.com/path/to/resource?existing=param";
		const params = {
			foo: "bar",
		};

		const result = createUrlWithParams(url, params);

		expect(result.toString()).toBe("http://example.com/path/to/resource?existing=param&foo=bar");
	});

	it("Устанавливает префикс в начало ссылки", () => {
		const url = "/path/to/resource";

		const result = createUrlWithParams(url, {}, "http://example.com");

		expect(result.toString()).toBe("http://example.com/path/to/resource");
	});

	it("Обрабатывает ссылки с уже установленными query параметрами и устанавливает префикс", () => {
		const url = "http://example.com/path/to/resource?existing=param";
		const params = {
			foo: "bar",
		};

		const result = createUrlWithParams(url, params, "http://example.com");

		expect(result.toString()).toBe("http://example.com/path/to/resource?existing=param&foo=bar");
	});
});
