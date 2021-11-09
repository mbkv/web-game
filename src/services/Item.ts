import { GameComponent } from "../models/GameComponent";

export class Item extends GameComponent {
	static getList() {
		let counter = 0;

		return [new Item(counter++, "DEBUGMODE")] as const;
	}

	protected constructor(
		public readonly id: number,
		public readonly name: string
	) {
		super();
	}
}
