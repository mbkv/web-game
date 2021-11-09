import { useCallback } from "react";
import { useLatest } from "react-use";

export const useLatestCB = <Fn extends (...args: any[]) => any>(
	handler: Fn
) => {
	const latest = useLatest(handler);

	const fn = ((...args: Parameters<Fn>) => latest.current(...args)) as Fn;
	return useCallback(fn, []);
};
