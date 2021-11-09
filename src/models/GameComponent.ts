import { nanoid } from "nanoid";
import { Game } from "../services/Game";

export abstract class GameComponent {
	key = nanoid();

	protected game: Game | undefined;
	onGameLoaded?(game: Game): void;
	onGameUnload?(game: Game): void;

	constructor() {
		this._onGameLoaded = this._onGameLoaded.bind(this);
		this._onGameUnload = this._onGameUnload.bind(this);
	}

	register(game: Game) {
		game.load.before.connect(this._onGameLoaded);
		game.unload.before.connect(this._onGameUnload);
	}
	unregister(game: Game) {
		game.load.before.disconnect(this._onGameLoaded);
		game.unload.before.disconnect(this._onGameUnload);
	}

	_onGameLoaded(game: Game) {
		this.game = game;
		this.onGameLoaded?.(game);
	}
	_onGameUnload(game: Game) {
		this.onGameUnload?.(game);
		this.game = undefined;
	}
}
