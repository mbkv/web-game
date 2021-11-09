import { useFps } from "../hooks/useFps";

export const Fps = () => {
	const [avg1Fps, avg5Fps, avg10Fps] = useFps();

	return (
		<div>
			<div>{avg1Fps?.toPrecision(3)}fps past 1 second</div>
			<div>{avg5Fps?.toPrecision(3)}fps past 5 seconds</div>
			<div>{avg10Fps?.toPrecision(3)}fps past 10 seconds</div>
		</div>
	);
};
