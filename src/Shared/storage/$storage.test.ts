import { $storage } from "@/Shared/storage/$storage.ts";

describe("$storage - API для работы с localStorage", () => {
	it("$storage устанавливает и отдает значение по ключу", () => {
		const key = "test-key";
		const value = { foo: "bar" };
		$storage.setValue(key, value);
		expect($storage.getValue(key)).toEqual(value);
	});

	it("Возвращает дефолтное значение если ключ не существует", () => {
		const key = "non-existing-key";
		const defaultValue = { foo: "bar" };
		expect($storage.getValue(key, defaultValue)).toEqual(defaultValue);
	});

	it("Распаршивает объекты Date сохраненные в localStorage сразу в объект Date", () => {
		const key = "test-key";
		const value = { foo: "bar", date: new Date() };
		$storage.setValue(key, value);
		const retrievedValue = $storage.getValue(key);
		expect(retrievedValue.date).toBeInstanceOf(Date);
		expect(retrievedValue.date.getTime()).toEqual(value.date.getTime());
	});
});
