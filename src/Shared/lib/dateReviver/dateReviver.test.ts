import { dateReviver } from "@/Shared/lib/dateReviver/dateReviver.ts";

describe("dateReviver - утилита для парсинга дат в JSON.parse", () => {
	it("Возвращает дату в ISO 8601 формате, как объект Date", () => {
		const dateString = "2023-10-10T10:10:10.000Z";
		const parsedDate = JSON.parse(`{"date": "${dateString}"}`, dateReviver).date;
		expect(parsedDate).toBeInstanceOf(Date);
		expect(parsedDate.toISOString()).toEqual(dateString);
	});

	it("Возвращает строки не измененными", () => {
		const str = "not-a-date";
		const parsedValue = JSON.parse(`{"value": "${str}"}`, dateReviver).value;
		expect(parsedValue).toEqual(str);
	});

	it("Возвращает числа не измененными", () => {
		const num = 42;
		const parsedValue = JSON.parse(`{"value": ${num}}`, dateReviver).value;
		expect(parsedValue).toEqual(num);
	});

	it("Возвращает булевые значения не измененными", () => {
		const bool = true;
		const parsedValue = JSON.parse(`{"value": ${bool}}`, dateReviver).value;
		expect(parsedValue).toEqual(bool);
	});
});
