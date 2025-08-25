import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type Pos = [number, number];
type PolyCord = [number, number, number, number]; // left-top-x left-top-y w h ,unit %
interface ErrwordProps {
	signal: number;
	text: string;
}
function Errword({ signal, text }: ErrwordProps) {
	const [pos, setPos] = useState<Pos>([0, 0]);
	const [clipPoly, setClipPoly] = useState<PolyCord>([0, 0, 100, 100]);
	useEffect(() => {
		if (signal === -1) {
			setPos([0, 0]);
			setClipPoly([0, 0, 100, 100]);
		} else {
			const newPos = [Math.random() * 60 - 30, Math.random() * 60 - 30] as Pos;
			setPos(newPos);
			const polyX = Math.random() * 100;
			const polyY = Math.random() * 100;
			const polyW = Math.random() * 50 + 50;
			const polyH = Math.random() * 60 + 20;
			setClipPoly([polyX, polyY, polyH, polyW]);
		}
	}, [signal]);
	return (
		<p
			className={twMerge(
				"absolute select-none text-6xl text-white",
				"before:absolute before:translate-x-[1.5%] before:text-red-500 before:left-0 before:mix-blend-screen",
				"after:absolute after:-translate-x-[1.5%] after:text-blue-600 after:left-0 after:mix-blend-screen",
				`before:content-(--err-content)`,
				` after:content-(--err-content)`,
			)}
			style={
				{
					translate: `${pos[0]}% ${pos[1]}%`,
					clipPath: `polygon( ${clipPoly[0]}%                ${clipPoly[1]}% ,
                                            ${clipPoly[0] + clipPoly[2]}% ${clipPoly[1]}%, 
                                            ${clipPoly[0] + clipPoly[2]}% ${clipPoly[1] + clipPoly[3]}%,
                                            ${clipPoly[0]}%               ${clipPoly[1] + clipPoly[3]}%)`,
					"--err-content": `"${text}"`,
				} as React.CSSProperties
			}
		>
			{text}
		</p>
	);
}

export default function Errwords() {
	const [signal, setSignal] = useState(-1);
	const i = useRef(-1);
	const [inputText, setInputText] = useState("");
	const [text, setText] = useState("你好，世界");
	return (
		<div className="h-full flex flex-col">
			<div className="h-10">
				<input
					type="text"
					placeholder="输入异常文字"
					className="border border-amber-300"
					onChange={(e) => {
						setInputText(e.target.value);
					}}
				/>
				<button
					type="button"
					onClick={() => {
						setText(inputText);
					}}
				>
					确认
				</button>
			</div>
			<div
				className="bg-black flex-1 flex justify-center items-center cursor-pointer"
				onClick={() => {
					if (i.current === -1) {
						i.current = setInterval(() => {
							setSignal((prev) => prev + 1);
						}, 30);
					} else {
						clearInterval(i.current);
						i.current = -1;
						setSignal(-1);
					}
				}}
			>
				<Errword signal={signal} text={text}></Errword>
				<Errword signal={signal} text={text}></Errword>
				<Errword signal={signal} text={text}></Errword>
			</div>
		</div>
	);
}
