import { nanoid } from "nanoid";
import { GameComponent } from "../models/GameComponent";

export class Stat extends GameComponent {
	constructor(public id = nanoid()) {
		super();
	}

	protected merge(rhs: Stat) {
		return this;
	}

	protected unmerge(rhs: Stat) {
		return this;
	}
}

export class AggregatedStats extends Stat {
	stats = new Set<Stat>();

	constructor() {
		super("total");
	}

	add(stat: Stat) {
		if (!this.stats.has(stat)) {
			this.merge(stat);

			this.stats.add(stat);
		}
	}
	subtract(stat: Stat) {
		if (this.stats.has(stat)) {
			this.unmerge(stat);

			this.stats.add(stat);
		}
	}
}
