import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { handErase, handTick } from "./animation";

type FormInputRowProp = {
	lableText: string;
	svgRef:
		| React.RefObject<SVGSVGElement>
		| undefined
		| ((el: SVGSVGElement | null) => void);
	onFocus: () => void;
	onFinish: () => void;
	onErase: () => void;
};
function FormInputRow({
	lableText,
	svgRef,
	onFocus,
	onFinish,
	onErase,
}: FormInputRowProp) {
	const [hoverActive, setHoverActive] = useState(false);
	const [focusActive, setFocusActive] = useState(false);
	const [inputVal, setInputVal] = useState("");
	const [didFinsh, setDidFinish] = useState(false);
	return (
		<div className=" w-full ">
			<div
				className={twMerge(
					"h-16 text-3xl leading-16  mb-2  transition-colors ",
					hoverActive || focusActive ? "text-[#17f700]" : "text-white",
				)}
			>
				{lableText}
			</div>
			<div className="h-12 flex justify-around items-center">
				<input
					type="text"
					className={twMerge(
						" h-full w-4/5 border-2  rounded-3xl transition-all text-white pl-4 text-xl outline-none",
						hoverActive || focusActive ? "border-[#17f700]" : "border-amber-50",
					)}
					onChange={(e) => {
						setInputVal(e.target.value);
					}}
					onFocus={() => {
						setFocusActive(true);
						onFocus();
					}}
					onBlur={() => {
						setFocusActive(false);
						if (inputVal !== "" && !didFinsh) {
							onFinish();
							setDidFinish(true);
						}
						if (inputVal === "" && didFinsh) {
							onErase();
							setDidFinish(false);
						}
					}}
					onMouseEnter={() => setHoverActive(true)}
					onMouseLeave={() => setHoverActive(false)}
				/>
				<svg
					className="text-white h-full "
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 125 102"
					ref={svgRef}
				>
					<title>Form input checkmark</title>
					<path d="M19,21H85V87H19V21Z" stroke="#f7f7f7" strokeWidth={6}></path>
					<path
						d="M14,42L40,78l71-64"
						stroke="#17f700"
						strokeWidth={13}
						strokeDasharray={150}
						strokeDashoffset={150} // 150是隐藏
						strokeLinecap="round"
						strokeLinejoin="round"
						fill="none"
						style={{
							translate: "0 10px",
							transition: "0.3s",
						}}
					></path>
				</svg>
			</div>
		</div>
	);
}
function useArraySVGRefs<T extends SVGSVGElement>(size: number) {
	const refs = useRef<(T | null)[]>(Array(size).fill(null));
	const setRef = (idx: number) => (el: T | null) => {
		refs.current[idx] = el;
	};
	return { refs, setRef };
}

export default function AnimationForm() {
	const items = ["NAME", "AGE", "GENDER", "EMAIL"];
	const container = useRef<HTMLDivElement>(null);
	const { refs: rects, setRef: setRectsRef } = useArraySVGRefs<SVGSVGElement>(
		items.length,
	);
	const hand = useRef<HTMLDivElement>(null);
	const [curIdx, setCurIdx] = useState(0); // 激活的inputIdx
	const timeline = useRef(gsap.timeline());

	const resize = () => {
		console.log(rects, rects.current);

		if (!rects.current[curIdx] || !hand.current) return;
		const r = rects.current[curIdx];
		const h = hand.current;
		const bounding = r.getBoundingClientRect();
		h.style.left = `${bounding.left + 6}px`;
		h.style.height = `${bounding.height * 5}px`;
		h.style.top = `${bounding.top - h.offsetHeight / 2}px`;
	};
	useEffect(() => {
		resize();
		window.addEventListener("resize", resize);
		return () => {
			window.removeEventListener("resize", resize);
		};
	}, []);

	useGSAP(
		() => {
			if (!rects.current[curIdx] || !hand.current || !container.current) return;
			const [r, h, c] = [
				rects.current[curIdx],
				hand.current,
				container.current,
			];
			const bounding = r.getBoundingClientRect();
			timeline.current.add(
				gsap.to(h, {
					top: bounding.top - h.offsetHeight / 2 + c.scrollTop,
					duration: 0.4,
				}),
			);
		},
		{ dependencies: [curIdx] },
	);
	return (
		<div
			className="flex-1 bg-black flex relative overflow-y-auto overflow-x-hidden"
			ref={container}
		>
			<div className="flex-1  flex flex-col items-center  ">
				{items.map((item, idx) => (
					<div
						className="shrink-0 h-[28%] w-2/3 min-w-100 flex items-center"
						key={item}
					>
						<FormInputRow
							lableText={`YOUR ${item}`}
							svgRef={setRectsRef(idx)}
							onFocus={() => {
								setCurIdx(idx);
							}}
							onFinish={() => {
								const h = hand.current;
								const r = rects.current[curIdx];
								if (!r || !h) return;
								handTick(timeline.current, h, r);
							}}
							onErase={() => {
								const h = hand.current;
								const r = rects.current[curIdx];
								if (!h || !r) return;
								handErase(timeline.current, h, r);
							}}
						/>
					</div>
				))}
			</div>
			<div className="absolute overflow-hidden z-0" ref={hand}>
				<img
					src="/animation_form/hand.png"
					alt="hand_picture"
					className="h-full object-cover object-left-top"
				/>
			</div>
		</div>
	);
}
