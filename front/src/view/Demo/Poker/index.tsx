import { type HTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";

export interface PokerProp extends HTMLAttributes<HTMLLIElement> {
	index: number;
}

export function Poker({ index, className, ...rest }: PokerProp) {
	return (
		<li
			className={twMerge("absolute w-1/4 max-w-70 aspect-[3/4] ", className)}
			{...rest}
		/>
	);
}

export type PokerAttr = {
	rotate: number;
	translateX: string;
	translateY: string;
	bgColor: string;
	transition?: string;
	id: string;
};

export function Pokers() {
	const [pokerAttrs, setPokerAttrs] = useState<PokerAttr[]>([
		{
			rotate: -30,
			translateX: "-110%",
			translateY: "0%",
			bgColor: "bg-amber-100",
			transition: "transition-transform duration-0",
			id: "1",
		},
		{
			rotate: -15,
			translateX: "-70%",
			translateY: "-10%",
			bgColor: "bg-amber-200",
			transition: "transition-transform duration-500",
			id: "2",
		},
		{
			rotate: 0,
			translateX: "-20%",
			translateY: "-20%",
			bgColor: "bg-amber-300",
			transition: "transition-transform duration-500",
			id: "3",
		},
		{
			rotate: 15,
			translateX: "30%",
			translateY: "-10%",
			bgColor: "bg-amber-400",
			transition: "transition-transform duration-500",
			id: "4",
		},
		{
			rotate: 30,
			translateX: "80%",
			translateY: "0%",
			bgColor: "bg-amber-500",
			transition: "transition-transform duration-500",
			id: "5",
		},
	]);
	const [nextNum, setNextNum] = useState(0);
	return (
		<div className="w-full flex-1 bg-sky-100">
			<ul className="flex justify-center items-center w-full h-full relative">
				{pokerAttrs.map((attrs, idx) => {
					return (
						<Poker
							index={idx}
							key={attrs.id}
							className={twMerge(attrs.bgColor, attrs.transition)}
							style={{
								translate: `${attrs.translateX} ${attrs.translateY}`,
								rotate: `${attrs.rotate}deg`,
								zIndex: (nextNum + idx) % pokerAttrs.length,
							}}
						></Poker>
					);
				})}
				<Poker
					index={6}
					className="bg-amber-800"
					style={{
						translate: `80% 0%`,
						rotate: `30deg`,
						zIndex: pokerAttrs.length,
					}}
					onClick={() => {
						setNextNum((prev) => prev + 1);
						setPokerAttrs((prev) => {
							const p = prev.map((item, idx) => {
								return {
									...prev[(idx + 1) % prev.length],
									bgColor: item.bgColor,
									id: item.id,
								};
							});
							return p;
						});
					}}
				>
					next
				</Poker>
			</ul>
		</div>
	);
}
