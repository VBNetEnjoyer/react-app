export type AnalyticsSliceScheme = {
	file?: File | null;
	isLoading?: boolean;
	hasError?: boolean;
	done: boolean;
	data?: AnalyticsData;
};

export type AnalyticsData = {
	totalSpendGalactic: number;
	rowsAffected: number;
	lessSpentAt: number;
	bigSpentAt: number;
	bigSpentValue: number;
	averageSpendGalactic: number;
	bigSpentCiv: string;
	lessSpentCiv: string;
};

export type AnalyticsRecord = {
	id: ReturnType<typeof window.crypto.randomUUID>;
	date: Date;
	isSuccess: boolean;
	fileName: string;
	data?: AnalyticsData;
};
