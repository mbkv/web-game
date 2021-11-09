import { useEffect } from "react";
import { Signal } from "../services/Signal";
import { useConst } from "./useConst";
import { useLatestCB } from "./useLatestCB";

export const useSignal = <Fn extends (...args: any[]) => void>() =>
	useConst(() => new Signal<Fn>());

export const useSignalHandler = <Fn extends (...args: any[]) => void>(
	signal: Signal<Fn> | undefined,
	handler: Fn
) => {
	const latestHandler = useLatestCB(handler);

	useEffect(() => {
		if (signal == null) {
			return;
		}
		signal.connect(latestHandler);

		return () => signal.disconnect(latestHandler);
	}, []);
};
