import { createContext, ReactNode, useEffect, useRef } from "react";
import { useConst } from "./hooks/useConst";
import { Game } from "./services/Game";
import { Keyboard } from "./services/Keyboard";

export const GameContext = createContext<Game>(new Game());

interface Props {
	children: ReactNode;
}

export const GameContextProvider = ({ children }: Props) => {
	const game = useConst(() => new Game());
	const initalized = useRef(false);

	if (!initalized.current) {
		initalized.current = true;
		game.registerSingleton(new Keyboard());
		game.run();
	}

	useEffect(() => () => game.stop(), []);

	return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};
