export const mapGet = <K, T>(map: Map<K, T>, key: K, def: () => T) => {
	if (!map.has(key)) {
		map.set(key, def());
	}

	return map.get(key) as T;
};
