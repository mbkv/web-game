import { useState } from "react";
import { useGameSingleton } from "../hooks/useGameSingleton";
import { useSignalHandler } from "../hooks/useSignal";
import { Keyboard } from "../services/Keyboard";

export const Debug = () => {
	const keyboard = useGameSingleton(Keyboard);
	const [event, setEvents] = useState<string[]>([]);

	console.log(10, keyboard);

	useSignalHandler(keyboard?.keydown, (e) => {
		setEvents((old) => [...old, `${e.key} keydown`]);
	});

	useSignalHandler(keyboard?.keyup, (e) => {
		setEvents((old) => [...old, `${e.key} keyup`]);
	});

	return (
		<div>
			{event.map((event, i) => (
				<div key={i}>{event}</div>
			))}
		</div>
	);
};
