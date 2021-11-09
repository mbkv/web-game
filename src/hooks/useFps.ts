import { useContext, useRef, useState } from "react";
import { useInterval } from "react-use";
import { GameContext } from "../GameContext";
import { useLatestCB } from "./useLatestCB";
import { useSignalHandler } from "./useSignal";

interface TimeStamps {
	time: number;
	index: number;
}
const useFpsAverage = (ms: number) => {
	const [fps, setFps] = useState<number | null>(null);

	const updateFps = useLatestCB((times: TimeStamps[]) => {
		setFps(() => {
			const now = Date.now();
			const end = now - ms;

			if (times.length === 0) {
				return null;
			}

			let i = times.length - 1;
			/* eslint-disable-next-line no-empty */
			for (; i > 0 && end < times[i].time; i--) {}

			return ((times.length - i) / (now - times[i].time)) * 1000;
		});
	});

	return [fps, updateFps] as const;
};
export const useFps = (updateIntervalMs = 80) => {
	const game = useContext(GameContext);
	const index = useRef<number>(0);
	const times = useRef<TimeStamps[]>([]);
	const [avg1Fps, updateAvg1Fps] = useFpsAverage(1000);
	const [avg5Fps, updateAvg5Fps] = useFpsAverage(5000);
	const [avg10Fps, updateAvg10Fps] = useFpsAverage(10000);

	useSignalHandler(game?.gameLoop, () => {
		times.current.push({ time: Date.now(), index: ++index.current });
	});

	useInterval(() => {
		updateAvg1Fps(times.current);
		updateAvg5Fps(times.current);
		updateAvg10Fps(times.current);
	}, updateIntervalMs);

	useInterval(() => {
		const limit = Date.now() - 15000;
		let i = 0;
		/* eslint-disable-next-line no-empty */
		for (; i < times.current.length && times.current[i].time < limit; i++) {}

		times.current.splice(0, i);
	}, 1000);

	return [avg1Fps, avg5Fps, avg10Fps] as const;
};
