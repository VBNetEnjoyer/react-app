import { dateReviver } from "@/Shared/lib/dateReviver/dateReviver.ts";

export const $storage = {
	setValue: (key: string, value: any) => {
		try {
			const serializedValue = JSON.stringify(value);
			localStorage.setItem(key, serializedValue);
		} catch (error) {
			console.error(`Ошибка сохранения ${key} в localStorage`, error);
		}
	},

	getValue: (key: string, defaultValue?: any) => {
		try {
			const storedValue = localStorage.getItem(key);
			if (storedValue === null) {
				return defaultValue;
			}
			return JSON.parse(storedValue, dateReviver);
		} catch (error) {
			console.error(`Ошибка чтения ${key} из localStorage`, error);
			return defaultValue;
		}
	},
};
