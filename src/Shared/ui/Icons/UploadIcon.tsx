import type { SVGProps } from "react";

export function UploadIcon(props?: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="35"
			height="35"
			viewBox="0 0 35 35"
			fill="black"
			{...props}
		>
			<path
				d="M17.5 4.68408V22.222"
				stroke="#201B10"
				strokeWidth="2.5"
				strokeMiterlimit="10"
				strokeLinecap="round"
			/>
			<path
				d="M24.2446 10.8732L18.4623 5.0894C18.2065 4.8363 17.8612 4.69434 17.5013 4.69434C17.1414 4.69434 16.7961 4.8363 16.5403 5.0894L10.755 10.8732M4.01026 20.1977V26.9425C4.00968 27.3857 4.09654 27.8245 4.26585 28.234C4.43516 28.6436 4.6836 29.0156 4.99694 29.329C5.31028 29.6423 5.68236 29.8908 6.09186 30.0601C6.50137 30.2294 6.94026 30.3162 7.38338 30.3157H27.6178C28.0608 30.316 28.4995 30.229 28.9088 30.0596C29.3182 29.8902 29.6901 29.6418 30.0033 29.3285C30.3164 29.0151 30.5648 28.6431 30.734 28.2337C30.9032 27.8243 30.99 27.3855 30.9894 26.9425V20.1977"
				stroke="#201B10"
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
