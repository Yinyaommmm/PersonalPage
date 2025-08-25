import { useEffect, useRef, useState } from "react";

const theta0 = 211;
const FRAMES = 74;
const FRAME_DEG_DELTA = 360 / FRAMES;

function calcAng(dy: number, dxx: number) {
	// const dx = dxx + 0.001;
	// const ori = (Math.atan(dy / dx) * 180) / Math.PI;
	// if (dy >= 0) {
	// 	if (dx >= 0) {
	// 		return ori;
	// 	} else {
	// 		return 180 + ori;
	// 	}
	// } else {
	// 	if (dx <= 0) {
	// 		return 180 + ori;
	// 	} else {
	// 		return 360 + ori;
	// 	}
	// }
	// 通过使用Math.atan2而不是Math.atan避免复杂的象限计算
	const dx = dxx + 0.001;
	return (360 + (Math.atan2(dy, dx) * 180) / Math.PI) % 360;
}

export default function Spider() {
	const imgRef = useRef<HTMLImageElement>(null);
	const [newRotate, setNewRotate] = useState(0);
	const [startImg, setStartImg] = useState(0);
	const [endImg, setEndImg] = useState(startImg);
	const delayTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined,
	);
	const iRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const onMove = (e: MouseEvent) => {
			const img = imgRef.current;
			if (img === null) return;
			// 跟踪鼠标
			const mx = e.clientX,
				my = e.clientY;
			const bbox = img.getBoundingClientRect();
			const imgCenterX = bbox.left + bbox.width / 2;
			const imgCenterY = bbox.top + bbox.height / 2;
			const dy = imgCenterY - my;
			const dx = mx - imgCenterX;
			const finalNewRotate = calcAng(dy, dx);
			setNewRotate(finalNewRotate); // atan值域在-pi/2~pi/2 所以在某些值要加上180 ,final range

			clearTimeout(delayTimerRef.current);
			clearInterval(iRef.current);
			delayTimerRef.current = setTimeout(() => {
				// 延时动画播放
				const newEnd =
					startImg + Math.floor((theta0 - finalNewRotate) / FRAME_DEG_DELTA);
				const finalNewEnd = newEnd < 0 ? newEnd + FRAMES : newEnd;
				setEndImg(finalNewEnd);
			}, 500);
		};
		window.addEventListener("mousemove", onMove);
		return () => {
			window.removeEventListener("mousemove", onMove);
			if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
			if (iRef.current) clearInterval(iRef.current);
		};
	}, []);
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (startImg === endImg) return;

		const biggerDirection =
			(endImg - startImg + FRAMES) % FRAMES <=
			(startImg + FRAMES - endImg) % FRAMES;

		iRef.current = setInterval(() => {
			setStartImg((prev) => {
				if (prev !== endImg) {
					return biggerDirection
						? (prev + 1) % FRAMES
						: (prev - 1 + FRAMES) % FRAMES;
				} else {
					clearInterval(iRef.current);
					return endImg;
				}
			});
		}, 25);
	}, [endImg]);
	return (
		<div className=" flex-1 bg-black flex justify-center items-center">
			<div className="w-1/3 aspect-square max-w-100 max-h-100">
				<img
					src={`/spidereye/eye_${startImg}.webp`}
					alt="spider"
					className="w-full h-full"
					ref={imgRef}
					style={{
						rotate: `${theta0 - newRotate}deg`,
					}}
				/>
			</div>
		</div>
	);
}
