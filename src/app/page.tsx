"use client";

import clsx from "clsx";
import { useRef, useState } from "react";

export default function Home() {
	const [positionClick, setPositionClick] = useState<number[]>([0]);
	const [score, setScore] = useState<number>(100);
	const [image, setImage] = useState<string | ArrayBuffer | null | undefined>(
		"",
	);

	const inputRef = useRef<HTMLInputElement>(null);
	const [imgSize, setImgSize] = useState<{ width: number; height: number }>({
		width: 0,
		height: 0,
	});

	function imageSize(result: string) {
		const img = document.createElement("img");

		const promise = new Promise((resolve, reject) => {
			img.onload = () => {
				const width = img.naturalWidth;
				const height = img.naturalHeight;

				resolve({ width, height });
			};

			img.onerror = reject;
		});

		img.src = result;

		return promise;
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<section>
				<button
					type="button"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={() => {
						inputRef.current?.click();
					}}
				>
					อัพโหลดรูป
				</button>
				<input
					ref={inputRef}
					className="hidden"
					type="file"
					onChange={(event) => {
						const file = event.target.files?.[0];
						const reader = new FileReader();

						reader.onload = async (e) => {
							const foo = e.target?.result;
							const size = (await imageSize(foo?.toString() ?? "")) as {
								width: number;
								height: number;
							};
							setImgSize(size);
							setImage(foo);
						};

						file && reader.readAsDataURL(file);
					}}
				/>
				<p>
					คะแนน: <span>{score}</span>
				</p>
				{image && (
					<div
						className={clsx("grid relative", {
							"grid-cols-16": imgSize.width > imgSize.height,
							"grid-cols-9": imgSize.width < imgSize.height,
						})}
					>
						{Array.from({ length: 144 }, (_, i) => i + 1).map((val) => (
							// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
							<div
								key={val}
								className={clsx(
									"bg-red-100 z-10 w-[50px] h-[50px] flex items-center justify-center border-2 border-black hover:bg-red-500 cursor-pointer",
									{
										"opacity-0": positionClick.some(
											(currentValue) => currentValue === val,
										),
									},
								)}
								onClick={() => {
									setPositionClick((prev) => [...prev, val]);
									if (positionClick.length > 1) {
										setScore((prev) => prev - 25);
									}
								}}
							>
								<p>{val}</p>
							</div>
						))}
						<img
							alt=""
							src={image?.toString()}
							className="absolute z-0 w-full h-full object-cover"
						/>
					</div>
				)}

				{image && (
					<button
						type="button"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={() => {
							const foo = Array.from({ length: 144 }, (_, i) => i + 1);
							setPositionClick(foo);
						}}
					>
						เฉลย
					</button>
				)}

				{image && (
					<button
						type="button"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={() => {
							setPositionClick([]);
							setScore(100);
						}}
					>
						รีเซ็ท
					</button>
				)}
			</section>
		</main>
	);
}
