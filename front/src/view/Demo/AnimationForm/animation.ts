import gsap from "gsap";
export function handTick(
	timeline: gsap.core.Timeline,
	hand: HTMLDivElement,
	rect: SVGSVGElement,
) {
	const h = hand;
	const r = rect;
	timeline.add(
		gsap
			.timeline()
			.to(h, {
				rotate: "5deg",
				x: "6%",
				y: "14%",
				duration: 0.2,
				ease: "linear",
				onStart: () => {
					const svgPath = r.querySelector("path:nth-of-type(2)");
					if (!svgPath) return;
					gsap.fromTo(
						svgPath,
						{ strokeDashoffset: 150 },
						{ strokeDashoffset: 0, duration: 0.4 },
					);
				},
			})
			.to(h, {
				rotate: "-2deg",
				x: "18%",
				y: "-12%",
				duration: 0.3,
				ease: "linear",
			})
			.to(h, {
				rotate: 0,
				x: 0,
				y: 0,
				duration: 0.3,
				ease: "linear",
			}),
	);
}

export function handErase(
	timeline: gsap.core.Timeline,
	hand: HTMLDivElement,
	rect: SVGSVGElement,
) {
	const h = hand;
	const r = rect;
	timeline.add(
		gsap
			.timeline()
			.to(h, {
				x: "-30%",
				y: "20%",
				duration: 0.3,
				ease: "linear",
				onStart: () => {
					if (!r) return;
					const svgPath = r.querySelector("path:nth-of-type(2)");
					if (!svgPath) return;
					gsap.fromTo(
						svgPath,
						{ strokeDashoffset: 0 },
						{ strokeDashoffset: 150, duration: 0.1 },
					);
				},
			})
			.to(h, {
				x: 0,
				y: 0,
				duration: 0.2,
				ease: "linear",
			}),
	);
}
