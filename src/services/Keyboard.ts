import { GameComponent } from "../models/GameComponent";
import { SignalMap } from "./Signal";

type KeyboardEventHandler = (e: KeyboardEvent) => void;

export class Keyboard extends GameComponent {
	keydown = new SignalMap<KeyboardEvent["key"], KeyboardEventHandler>();
	keyup = new SignalMap<KeyboardEvent["key"], KeyboardEventHandler>();

	constructor() {
		super();

		this._onKeyDown = this._onKeyDown.bind(this);
		this._onKeyUp = this._onKeyUp.bind(this);
	}

	_onKeyDown(e: KeyboardEvent) {
		this.keydown.emitWithKey(e.key, e);
	}

	_onKeyUp(e: KeyboardEvent) {
		this.keyup.emitWithKey(e.key, e);
	}

	onGameLoaded() {
		document.addEventListener("keydown", this._onKeyDown);
		document.addEventListener("keyup", this._onKeyUp);
	}

	onGameUnload() {
		document.removeEventListener("keydown", this._onKeyDown);
		document.removeEventListener("keyup", this._onKeyUp);
	}
}
