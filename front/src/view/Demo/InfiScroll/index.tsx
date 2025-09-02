import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

const PHOTONUM = 28;
const ROWNUM = 4;
const PERROW = PHOTONUM / ROWNUM;
const photoContent = Array(PHOTONUM)
	.fill(0)
	.map((_, idx) => idx);
function chunkArray<T>(arr: Array<T>, size: number) {
	const result = [];
	for (let i = 0; i < arr.length; i += size) {
		result.push(arr.slice(i, i + size));
	}
	return result;
}
function getTranslate(e: HTMLElement): { x: number; y: number } {
	if (e.style.translate === "") {
		return {
			x: 0,
			y: 0,
		};
	} else {
		const arr = e.style.translate.split(" ");
		const ystr = arr[1] !== undefined ? arr[1].slice(0, -2) : "0px";

		return {
			x: parseInt(arr[0].slice(0, -2), 10) || 0,
			y: parseInt(ystr, 10) || 0,
		};
	}
}

export function useArrayRefs<T extends HTMLElement>(size: number) {
	const refs = useRef<(T | null)[]>(Array(size).fill(null));
	const setRef = (idx: number) => (el: T | null) => {
		refs.current[idx] = el;
	};
	return { refs, setRef };
}

export function useInfiScroll(
	imgRefs: React.MutableRefObject<(HTMLElement | null)[]>,
	photosRef: React.RefObject<HTMLDivElement | null>,
	containerRef: React.RefObject<HTMLDivElement | null>,
) {
	const moveable = useRef(false);
	const startPos = useRef({ x: -1, y: -1 }); // 点击起始位置
	const deltaPos = useRef({ x: 0, y: 0 }); // 位移距离
	const observerRef = useRef<IntersectionObserver | null>(null);
	const photosSize = useRef({
		w: 0,
		h: 0,
	}); // 这个会比视窗大
	const containerSize = useRef({
		w: 0,
		h: 0,
	}); // 视窗大小
	const imgsStartOffsets = useRef<{ x: number; y: number }[]>(
		imgRefs.current.map(() => ({ x: 0, y: 0 })),
	); // 初始每个图片在父亲元素内的offset
	const imgsCurTrans = useRef<{ x: number; y: number }[]>(
		imgRefs.current.map(() => ({ x: 0, y: 0 })),
	); // 每个图当前的translate

	const init = () => {
		if (!photosRef.current || !containerRef.current) return;
		photosSize.current = {
			w: photosRef.current.offsetWidth,
			h: photosRef.current.offsetHeight,
		};
		containerSize.current = {
			w: containerRef.current.offsetWidth,
			h: containerRef.current.offsetHeight,
		};
		imgsStartOffsets.current = imgRefs.current.map((i) =>
			i ? { x: i.offsetLeft, y: i.offsetTop } : { x: 0, y: 0 },
		);
		imgsCurTrans.current = imgRefs.current.map((i) =>
			i ? getTranslate(i) : { x: 0, y: 0 },
		);
		// 每个图片当前的translate
	};
	useEffect(() => {
		init();
		console.log(
			"offsets",
			imgsStartOffsets.current,
			"tran",
			imgsCurTrans.current,
		);

		const onDown = (e: MouseEvent) => {
			if (photosRef.current === null) return;
			moveable.current = true;
			startPos.current = {
				x: e.clientX,
				y: e.clientY,
			};
		};
		const onMove = (e: MouseEvent) => {
			if (moveable.current === false || photosRef.current === null) return;
			deltaPos.current = {
				x: e.clientX - startPos.current.x,
				y: e.clientY - startPos.current.y,
			};
			imgRefs.current.forEach((img, idx) => {
				if (!img) return;
				let duration = 0.1;
				const imgOffset = imgsStartOffsets.current[idx];
				const curTrans = imgsCurTrans.current[idx];

				let newX = curTrans.x + deltaPos.current.x;
				if (imgOffset.x + newX > photosSize.current.w - img.offsetWidth) {
					newX -= photosSize.current.w;
					duration = 0;
				}
				if (imgOffset.x + newX < -img.offsetWidth) {
					newX += photosSize.current.w;
					duration = 0;
				}
				let newY = curTrans.y + deltaPos.current.y;
				if (imgOffset.y + newY > photosSize.current.h - img.offsetHeight) {
					newY -= photosSize.current.h;
					duration = 0;
				}
				if (imgOffset.y + newY < -img.offsetHeight) {
					newY += photosSize.current.h;
					duration = 0;
				}
				// img.style.transition = `${duration}s ease`;
				img.style.translate = `${newX}px ${newY}px`;
			});
		};
		const onUp = (e: MouseEvent) => {
			moveable.current = false;
			imgRefs.current.forEach((img, idx) => {
				if (!img) return;
				imgsCurTrans.current[idx] = getTranslate(img);
			});
		};

		window.addEventListener("mousedown", onDown);
		window.addEventListener("mousemove", onMove);
		window.addEventListener("mouseup", onUp);
		return () => {
			window.removeEventListener("mousedown", onDown);
			window.removeEventListener("mousemove", onMove);
			window.removeEventListener("mouseup", onUp);
			observerRef.current?.disconnect();
			observerRef.current = null;
		};
	}, []);
}

export default function InfiScroll() {
	const { refs: imgRefs, setRef } = useArrayRefs(PHOTONUM);
	const photosRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	useInfiScroll(imgRefs, photosRef, containerRef);
	return (
		<div
			className="flex-1 w-full bg-[#171717] overflow-hidden"
			ref={containerRef}
		>
			<div
				data-id="photos"
				ref={photosRef}
				className="w-max h-max  relative  bg-amber-200"
			>
				{chunkArray(photoContent, PHOTONUM / ROWNUM).map((item, rowIdx) => {
					return (
						<div className="flex w-max h-max " key={`row-${rowIdx}`}>
							{item.map((val, colIdx) => (
								<div
									className={twMerge(
										"bg-sky-100 h-[342px] w-[234px] rounded-2xl mr-9 mb-12",
										"text-4xl hover:text-[6xl] ",
									)}
									ref={setRef(rowIdx * PERROW + colIdx)}
									key={`col-${colIdx}`}
								>
									<div className="w-full h-full flex justify-center items-center  select-none hover:scale-125  ">
										Picture {val}
									</div>
								</div>
							))}
						</div>
					);
				})}
			</div>
		</div>
	);
}
