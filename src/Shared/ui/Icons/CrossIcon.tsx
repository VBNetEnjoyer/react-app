import type { SVGProps } from "react";

export function CrossIcon(props?: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 22 22"
			fill="none"
			{...props}
		>
			<path
				d="M1.66675 20.3333L11.0001 11M11.0001 11L20.3334 1.66666M11.0001 11L1.66675 1.66666M11.0001 11L20.3334 20.3333"
				stroke="white"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
