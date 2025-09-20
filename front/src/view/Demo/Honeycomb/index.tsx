import { gsap } from "gsap";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./stroke.module.css";
export default function HoneyComb() {
	const divRef = useRef<HTMLDivElement>(null);
	const hexId = useId();
	const [viewBox, setViewBox] = useState("0 0 1000 1000");
	const [ready, setReady] = useState(false);
	const cols = 20;
	const rows = 15;
	const hexRefs = useRef<SVGUseElement[]>([]);
	const hexs = useRef(
		Array.from({ length: rows }).map((_, rowId) => {
			return Array.from({ length: cols }).map((_, colId) => {
				const x = colId * 86.6 + (rowId % 2) * 43.3;
				const y = rowId * 100 - (rowId - 1) * 25;
				return (
					<use
						key={`hex-${rowId}-${
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							colId
						}`}
						href={`#${hexId}`}
						x={x}
						y={y}
						className={styles.comb}
						ref={(el) => {
							if (el) hexRefs.current.push(el);
						}}
					/>
				);
			});
		}),
	);

	const hidden = () => {
		console.log(123);

		gsap
			.timeline()
			.set(hexRefs.current, {
				strokeDashoffset: () => -50 + Math.random() * 100,
			})
			.to(hexRefs.current, {
				strokeDashoffset: 300,
				strokeOpacity: 0,
				scale: 0,
				duration: 0.5,
				ease: "power2.inOut",
				stagger: { each: 0.002, from: "random" },
			});
	};
	useEffect(() => {
		const resize = () => {
			setReady(false);
			if (divRef.current) {
				const { width, height } = divRef.current.getBoundingClientRect();
				setViewBox(`0 0 ${width} ${height}`);
				console.log(`0 0 ${width} ${height}`);
				setReady(true);
			}
		};
		resize();
		const observer = new ResizeObserver(resize);
		if (divRef.current) {
			observer.observe(divRef.current);
		}
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		console.log(divRef.current?.clientWidth, divRef.current?.clientHeight);
	}, []);
	return (
		<div
			className="bg-black flex-1 relative flex justify-center items-center"
			ref={divRef}
			onClick={hidden}
		>
			<div className="text-white">啊哈哈</div>
			{ready && (
				<svg
					className="absolute top-0 left-0  w-full h-full overflow-hidden"
					viewBox={viewBox}
					preserveAspectRatio="none"
				>
					<title>Honeycomb graphic</title>
					<defs>
						<polygon
							id={hexId}
							points="0,-50 43.3,-25 43.3,25 0,50 -43.3,25 -43.3,-25"
							fill="#171717"
							stroke="#17f700"
						/>
					</defs>
					{hexs.current}
				</svg>
			)}
		</div>
	);
}
