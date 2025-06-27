export const createUrlWithParams = (url: string | URL, params: Record<string, any>, prefix?: string) => {
	const urlObj = new URL(url, prefix);

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			urlObj.searchParams.append(key, String(value));
		}
	});

	return urlObj;
};
