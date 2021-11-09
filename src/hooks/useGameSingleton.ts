import { useContext, useState } from "react";
import { GameContext } from "../GameContext";
import { GameComponent } from "../models/GameComponent";
import { useSignalHandler } from "./useSignal";

export const useGameSingleton = <GC extends GameComponent>(cls: CtorOf<GC>) => {
	const game = useContext(GameContext);
	const [component, setComponent] = useState(() => game.getSingleton(cls));
	useSignalHandler(game.registeredSingleton.getSignal(cls), (instance: GC) =>
		setComponent(instance)
	);

	return component;
};
