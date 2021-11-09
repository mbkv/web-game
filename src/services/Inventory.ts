import { GameComponent } from "../models/GameComponent";
import { Game } from "./Game";
import { Item } from "./Item";
import { SignalMap } from "./Signal";

interface ItemEvent {
	item: Item;
	previous: number;
	current: number;
	change: number;
}

type ItemEventHandler = (e: ItemEvent) => void;

export class Inventory extends GameComponent {
	items = new SignalMap<Item["id"], ItemEventHandler>();

	protected inventory = new Map<Item["id"], number>();

	add(item: Item, count: number) {
		const previous = this.inventory.get(item.id) ?? 0;
		this.change({
			item,
			previous,
			current: previous + count,
			change: count,
		});
	}

	remove(item: Item, count: number) {
		const previous = this.inventory.get(item.id) ?? 0;
		this.change({
			item,
			previous,
			current: previous - count,
			change: -count,
		});
	}

	protected change(e: ItemEvent) {
		this.inventory.set(e.item.id, e.current);
		this.items.emitWithKey(e.item.id, e);
	}
}
