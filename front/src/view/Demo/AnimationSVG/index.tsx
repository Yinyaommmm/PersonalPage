import styles from "./venus.module.css";
export default function AnimationSVG() {
	return (
		<div className="flex-1 bg-black flex justify-center items-center">
			<div data-id="content">
				<svg viewBox="0 0 550 799.7" className="w-100 overflow-visible">
					<title>venus</title>
					<image
						width="100%"
						height="100%"
						href="/animation_svg/venus_body.svg"
					></image>
					<g className={styles.animatedForearm}>
						<image
							width="550"
							height="799.7"
							href="/animation_svg/venus_forearm.svg"
						></image>
						<g>
							<circle
								className={styles.animatedCircle}
								fill="#B20426"
								cx="214"
								cy="549.8"
								r="10.7"
							/>
						</g>
						<line
							className={styles.st1}
							x1="234.8"
							y1="527.2"
							x2="362.5"
							y2="432.8"
						/>
						<image
							width="550"
							height="799.7"
							href="/animation_svg/venus_hand.svg"
							className={styles.animatedHand}
						></image>
					</g>
				</svg>
			</div>
		</div>
	);
}
