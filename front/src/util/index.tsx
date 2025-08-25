import { useEffect, useRef } from "react";

// Debounce 延时触发
export function useDebounce(fn: () => void, delay: number) {
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const run = () => {
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = setTimeout(fn, delay);
	};

	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);

	return run;
}

// Throttle 事件冷却
