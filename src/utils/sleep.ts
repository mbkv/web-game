export const sleep = (ms: number): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, ms));

export const sleepUntil = (ms: number) => {
	const diff = ms - Date.now();
	if (diff > 0) {
		return sleep(diff);
	}
};
