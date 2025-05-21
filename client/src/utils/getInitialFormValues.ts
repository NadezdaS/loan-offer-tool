export function getInitialFormValues<T>(defaults: T, key: string): T {
	const saved = localStorage.getItem(key);
	if (!saved) return defaults;

	try {
		const parsed = JSON.parse(saved);
		return { ...defaults, ...parsed };
	} catch {
		return defaults;
	}
}
