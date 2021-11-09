export const rafPromise = () => {
	return new Promise((resolve) => window.requestAnimationFrame(resolve));
};
