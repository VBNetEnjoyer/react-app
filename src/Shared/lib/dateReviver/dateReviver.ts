export const dateReviver = (_: any, value: any) => {
	if (typeof value === "string") {
		const iso8601DateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z?$/;
		if (iso8601DateRegex.test(value)) {
			const date = new Date(value);
			if (!isNaN(date.getTime())) {
				return date;
			}
		}
	}
	return value;
};
