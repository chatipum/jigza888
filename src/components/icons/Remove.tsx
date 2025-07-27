import clsx from "clsx";

interface Props {
	className?: string;
}

export default function IconRemove({ className }: Props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="4"
			stroke="currentColor"
			className={clsx("size-5", className)}
		>
			<title>icon-remove</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M6 18 18 6M6 6l12 12"
			/>
		</svg>
	);
}
