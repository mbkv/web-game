import { GameComponent } from "../models/GameComponent";
import { Game } from "./Game";
import { Inventory } from "./Inventory";
import { Stat } from "./Stats";

export class Player extends GameComponent {
	inventory = new Inventory();
	stats = new Stat();

	register(game: Game) {
		this.inventory.register(game);
		this.stats.register(game);
	}
	unregister(game: Game) {
		this.inventory.unregister(game);
		this.stats.unregister(game);
	}
}
