import { GameComponent } from "../models/GameComponent";
import { mapGet } from "../utils/mapGet";
import { sleepUntil } from "../utils/sleep";
import { SignalMap, TimeContextualSignal } from "./Signal";

export class Game {
	running = false;
	tickMs = 1000 / 20;
	maxTickMs = 2000;

	load = new TimeContextualSignal<(e: Game) => void>();
	unload = new TimeContextualSignal<(e: Game) => void>();
	gameLoop = new TimeContextualSignal<(e: number) => void>();

	/* eslint-disable @typescript-eslint/ban-types */
	registered = new SignalMap<
		CtorOf<GameComponent>,
		(c: GameComponent) => void
	>();
	registeredSingleton = new SignalMap<
		CtorOf<GameComponent>,
		(c: GameComponent) => void
	>();
	components = new Map<CtorOf<GameComponent>, Set<GameComponent>>();
	singletons = new Map<CtorOf<GameComponent>, GameComponent>();
	/* eslint-enable @typescript-eslint/ban-types */

	register(component: GameComponent) {
		const s = mapGet(this.components, component.constructor, () => new Set());
		s.add(component);
		component.register(this);
		this.registered.emit(component);
	}

	unregister(component: GameComponent) {
		const s = mapGet(this.components, component.constructor, () => new Set());
		s.delete(component);
		component.unregister(this);
	}

	registerSingleton(component: GameComponent) {
		this.singletons.set(
			component.constructor as CtorOf<GameComponent>,
			component
		);
		component.register(this);
		this.registeredSingleton.emit(component);
	}

	unregisterSingleton(component: GameComponent) {
		this.singletons.delete(component.constructor as CtorOf<GameComponent>);
		component.unregister(this);
	}

	get<T extends GameComponent>(cls: CtorOf<T>): Set<T> {
		return mapGet(this.components, cls, () => new Set()) as Set<T>;
	}

	getSingleton<T extends GameComponent>(cls: CtorOf<T>) {
		return this.singletons.get(cls) as T | undefined;
	}

	async run() {
		this.running = true;
		await this.load.emit(this);

		let time = Date.now();
		this.gameLoop.emit(0);
		await sleepUntil(time + this.tickMs);

		while (this.running) {
			const now = Date.now();
			let diff = now - time;
			while (diff > 0) {
				const tickSize = Math.min(diff, this.maxTickMs);
				diff -= tickSize;
				await this.gameLoop.emit(tickSize);
			}
			time = now;
			await sleepUntil(time + this.tickMs);
		}

		this.unload.emit(this);
	}

	stop() {
		this.running = false;
	}
}
