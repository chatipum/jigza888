import clsx from "clsx";

interface Props {
	className?: string;
}

export default function IconPlus({ className }: Props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="4"
			stroke="currentColor"
			className={clsx("size-5", className)}
		>
			<title>icon-plus</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 4.5v15m7.5-7.5h-15"
			/>
		</svg>
	);
}
