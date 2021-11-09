import { mapGet } from "../utils/mapGet";

type Func = (...args: any[]) => any;

export class Signal<Fn extends Func> {
	private fns = new Set<Fn>();

	connect(fn: Fn) {
		this.fns.add(fn);
	}

	disconnect(fn: Fn) {
		this.fns.delete(fn);
	}

	async emit(...args: Parameters<Fn>) {
		await Promise.all(Array.from(this.fns, (fn) => fn(...args)));
	}
}

export class SignalMap<K, Fn extends Func> extends Signal<Fn> {
	events = new Map<K, Signal<Fn>>();

	getSignal(key: K) {
		return mapGet(this.events, key, () => new Signal());
	}

	connect(fn: Fn): void;
	connect(key: K, fn: Fn): void;
	connect(...args: [Fn] | [K, Fn]) {
		if (args.length === 1) {
			const fn = args[0];
			super.connect(fn);
		} else if (args.length > 1) {
			const key = args[0];
			const fn = args[1];

			mapGet(this.events, key, () => new Signal()).connect(fn);
		}
	}

	disconnect(fn: Fn): void;
	disconnect(key: K, fn: Fn): void;
	disconnect(...args: [Fn] | [K, Fn]) {
		if (args.length === 1) {
			const fn = args[0];
			super.disconnect(fn);
		} else if (args.length > 1) {
			const key = args[0];
			const fn = args[1];

			mapGet(this.events, key, () => new Signal()).disconnect(fn);
		}
	}

	async emitWithKey(key: K, ...args: Parameters<Fn>) {
		await Promise.all([this.emit(...args), this.getSignal(key).emit(...args)]);
	}
}

export class TimeContextualSignal<Fn extends Func> extends Signal<Fn> {
	static syncEmits<Fn extends Func>(
		signals: TimeContextualSignal<Fn>[],
		...args: Parameters<Fn>
	) {
		for (const el of signals) {
			el.before.emit(...args);
		}
		for (const el of signals) {
			el.emitOnly(...args);
		}
		for (const el of signals) {
			el.after.emit(...args);
		}
	}

	before = new Signal<Fn>();
	after = new Signal<Fn>();

	emitOnly(...args: Parameters<Fn>) {
		super.emit(...args);
	}

	async emit(...args: Parameters<Fn>) {
		await this.before.emit(...args);
		await super.emit(...args);
		await this.after.emit(...args);
	}
}
