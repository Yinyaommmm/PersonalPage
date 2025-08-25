import { useLayoutEffect, useRef } from "react";

export function useHoriScroll(
	innerScroll: React.RefObject<HTMLDivElement>,
	outerBlock: React.RefObject<HTMLDivElement>,
	cars: React.RefObject<HTMLImageElement>[],
	buildings: React.RefObject<HTMLImageElement>[],
) {
	const triggerDist = useRef(0);
	const endDist = useRef(0);
	const init = () => {
		if (innerScroll.current === null || outerBlock.current === null) {
			console.log("inner or outer null");
			return;
		}
		const i = innerScroll.current;
		const o = outerBlock.current;
		const { width } = i.getBoundingClientRect();
		o.style.height = `${width}px`;
		triggerDist.current = o.offsetTop;
		endDist.current = o.offsetTop + o.offsetHeight - innerHeight;
	};
	const move = () => {
		if (innerScroll.current === null || outerBlock.current === null) {
			return;
		}
		if (scrollY >= triggerDist.current && scrollY <= endDist.current) {
			const translateY = scrollY - triggerDist.current;
			const maxtransY = endDist.current - triggerDist.current;
			const translateX =
				(translateY / maxtransY) *
				(innerScroll.current.offsetWidth - innerWidth);
			innerScroll.current.style.translate = `-${translateX}px ${translateY}px`;
			console.log("cars", cars, buildings);
			cars.forEach((car) => {
				if (car.current === null) return;
				car.current.style.translate = `${translateX * 1.6}px`;
			});
			buildings.forEach((buildings) => {
				if (buildings.current === null) return;
				buildings.current.style.translate = `${translateX * 0.6}px`;
			});
		}
	};
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useLayoutEffect(() => {
		init();
		window.addEventListener("resize", init);
		window.addEventListener("scroll", move);
		return () => {
			window.removeEventListener("resize", init);
			window.removeEventListener("scroll", move);
		};
	}, []);
}
