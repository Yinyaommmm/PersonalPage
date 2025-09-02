import { useRef } from "react";
import { useHoriScroll } from "./useHoriScroll";

export default function HoriScroll() {
	const innerScroll = useRef<HTMLDivElement>(null);
	const outerBlock = useRef<HTMLDivElement>(null);
	const cars: React.RefObject<HTMLImageElement>[] = [
		useRef<HTMLImageElement>(null),
		useRef<HTMLImageElement>(null),
		useRef<HTMLImageElement>(null),
	];
	const buildings: React.RefObject<HTMLImageElement>[] = [
		useRef<HTMLImageElement>(null),
		useRef<HTMLImageElement>(null),
		useRef<HTMLImageElement>(null),
	];
	useHoriScroll(innerScroll, outerBlock, cars, buildings);
	return (
		<div className="flex flex-col bg-black space-y-8">
			<div className=" h-screen bg-[#17f700] flex justify-center items-center text-6xl  rounded-4xl">
				empty
			</div>
			<div className=" h-screen bg-[#17f700] flex justify-center items-center text-6xl  rounded-4xl">
				empty
			</div>
			<div ref={outerBlock} className="flex overflow-hidden bg-sky-100 ">
				{/* 父元素设置为flex后，子元素flex-basis:auto将会发挥作用，使得子元素在主轴上的宽度由内容决定 */}
				<div
					ref={innerScroll}
					className="px-20 h-screen flex space-x-5 justify-start items-center  "
				>
					{[0, 1, 2].map((idx) => {
						return (
							<div
								data-x="card-container"
								className="relative h-160 w-270  bg-amber-300 shrink-0 flex justify-center items-center rounded-4xl overflow-hidden"
								key={`card-cont-${idx}`}
							>
								<img
									className="absolute h-[90%] bottom-0 left-0 object-cover"
									style={{
										left: `calc(-${idx * 100}% - ${idx * 20}px)`,
										maxWidth: "none",
									}}
									src="/horizontal_scroll/city.svg"
									alt="city1"
									ref={buildings[idx]}
								/>
								<img
									className="absolute h-1/10 bottom-0 left-0"
									style={{ left: `calc(-${idx * 100}% - ${idx * 20}px)` }}
									src="/horizontal_scroll/truck.svg"
									alt="truck"
									ref={cars[idx]}
								/>
								<p className="text-6xl relative z-1">Card {idx}</p>
							</div>
						);
					})}
				</div>
			</div>
			<div className=" h-screen bg-[#17f700] flex justify-center items-center text-6xl  rounded-4xl">
				empty
			</div>
			<div className=" h-screen bg-[#17f700] flex justify-center items-center text-6xl  rounded-4xl">
				empty
			</div>
		</div>
	);
}
