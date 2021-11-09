import { MutableRefObject, useRef } from "react";

const symbol = Symbol("useRefFactory");

export const useRefFactory = <T>(fn: () => T) => {
	const ref = useRef<T | symbol>(symbol);

	if (Object.is(ref.current, symbol)) {
		ref.current = fn();
	}

	return ref as MutableRefObject<T>;
};
