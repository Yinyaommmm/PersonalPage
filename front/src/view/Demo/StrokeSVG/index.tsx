import { twMerge } from "tailwind-merge";
import styles from "./stroke.module.css";
export default function StrokeSVG() {
    return <div className="bg-black flex-1 ">
        <div className="grid grid-cols-2 grid-rows-2 w-max">
            <svg  viewBox="0 0 100 100" className={twMerge("w-50 h-50 stroke-green-400 bg-amber-200", styles.strokeSvgCircle)}>
            <circle cx="50" cy="50" r="48" strokeWidth="2" fill="none" />
        </svg>
        <svg  viewBox="0 0 100 100" className={twMerge("w-50 h-50 stroke-green-400 bg-amber-200", styles.strokeSvgCircleReverse)}>
            <circle cx="50" cy="50" r="48" strokeWidth="2" fill="none" />
        </svg>
         <svg  viewBox="0 0 100 100" className={twMerge("w-50 h-50 stroke-green-400 bg-amber-200", styles.strokeSvgLine)}>
            <line x1="0" y1="0" x2="100" y2="100" ></line>
        </svg>
         <svg  viewBox="0 0 100 100" className={twMerge("w-50 h-50 stroke-green-400 bg-amber-200", styles.strokeSvgLine)}>
            <line x1="100" y1="0" x2="0" y2="100" ></line>
        </svg>
        </div>
        
    </div>;
}