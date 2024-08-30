"use client";

import type { Players } from "@/atom";
import { usePlayers } from "@/hooks";
import clsx from "clsx";
import { useMemo, useRef, useState } from "react";

export default function PageGame() {
	const [playersStorage, setPlayerStorage] = usePlayers();

	const [choiceList, setChoiceList] = useState<number[]>([0]);
	const [score, setScore] = useState<number>(100);
	const [image, setImage] = useState<string | null>(null);
	const [player, setPlayer] = useState<Players | null>(null);
	const [newPlayer, setNewPlayer] = useState<Players | null>(null);

	const inputRef = useRef<HTMLInputElement>(null);

	const readerImage = (file: File | undefined) => {
		const reader = new FileReader();

		reader.onload = async (e) => {
			setImage(e.target?.result?.toString() ?? null);
		};

		file && reader.readAsDataURL(file);
	};

	const init = () => {
		setChoiceList([0]);
		setScore(100);
		setImage(null);
		setPlayer(null);
	};

	const answer = () => {
		setChoiceList(Array.from({ length: 144 }, (_, i) => i + 1));
	};

	const onSave = () => {
		if (player) {
			const playerIndex = playersStorage.indexOf(player);
			const currentPlayer = playersStorage[playerIndex];
			const newPlayerList = playersStorage.filter(
				(val) => val.id !== currentPlayer.id,
			);
			setPlayerStorage([
				...newPlayerList,
				{ ...currentPlayer, score: currentPlayer.score + score },
			]);

			init();
		}
	};

	const playerList = useMemo(
		() => playersStorage.sort((a, b) => b.score - a.score),
		[playersStorage],
	);

	return (
		<main className="flex flex-row justify-center h-screen bg-[url('https://images2.alphacoders.com/128/thumb-1920-1281008.jpg')]">
			<article className="container max-w-4xl mx-auto space-y-4 w-2/3">
				<div className="flex flex-shrink justify-between pt-4">
					<div className="flex flex-row space-x-4">
						<div className="text-3xl bg-black/80 shadow-white shadow-lg rounded-lg p-2 w-48 flex flex-row justify-between">
							<span>Point:</span>
							<span>{score}</span>
						</div>
						<button
							type="button"
							disabled={!player || choiceList.length < 2}
							className="bg-white hover:bg-gray-200 disabled:bg-gray-500 disabled:text-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
							onClick={onSave}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="size-6 mr-2"
							>
								<title>icon-save</title>
								<path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
								<path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
								<path d="M7 3v4a1 1 0 0 0 1 1h7" />
							</svg>
							<span>Save</span>
						</button>
					</div>
					<div className="flex flex-row">
						<div className="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="2"
								stroke="currentColor"
								className="size-10"
							>
								<title>icon-user</title>

								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								/>
							</svg>
						</div>
						<div className="relative h-full">
							<select
								className="block h-full appearance-none w-48 bg-white border border-gray-200 text-gray-700 p-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 cursor-pointer"
								id="grid-state"
								value={player?.id ?? ""}
								onChange={(e) => {
									const selectedPlayer = playersStorage.find(
										(val) => val.id.toString() === e.target.value,
									);

									if (selectedPlayer) {
										setPlayer(selectedPlayer);
									}
								}}
							>
								<option value="" disabled>
									Select Player
								</option>
								{playersStorage.map((player) => (
									<option key={player.id} value={player.id}>
										{player.name}
									</option>
								))}
							</select>
							<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
								<svg
									className="fill-current h-4 w-4"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
								>
									<title>icon-select</title>
									<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
								</svg>
							</div>
						</div>
					</div>
				</div>

				<section className="rounded-lg border-2 bg-black/80 shadow-2xl shadow-white/50 w-[900px] h-[600px] flex justify-center p-4">
					{image ? (
						<div className="w-full h-full">
							<div className="relative grid grid-cols-16 h-full w-full">
								<img
									alt=""
									src={image}
									className="absolute object-cover w-full h-full rounded-lg"
								/>
								{Array.from({ length: 144 }, (_, i) => i + 1).map((choice) => (
									<button
										type="button"
										key={choice}
										className={clsx(
											"bg-black z-10 flex items-center justify-center border border-white hover:bg-gray-500 cursor-pointer",
											{
												"opacity-0 ease-out duration-700": choiceList.some(
													(selectedChoice) => choice === selectedChoice,
												),
											},
										)}
										onClick={() => {
											setChoiceList((prev) => [...prev, choice]);
											if (choiceList.length > 1) {
												setScore((prev) => prev - 25);
											}
										}}
									>
										<p>{choice}</p>
									</button>
								))}
							</div>
						</div>
					) : (
						<div className="flex items-center justify-center">
							<div className="w-64 h-20 border-2 border-dashed rounded-lg bg-black/50 flex justify-center items-center">
								<span>No Image</span>
							</div>
						</div>
					)}
				</section>

				<section className="flex justify-between">
					<div className="flex space-x-4">
						<button
							type="button"
							className="bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
							onClick={() => {
								inputRef.current?.click();
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="2"
								stroke="currentColor"
								className="size-5 mr-2"
							>
								<title>icon-upload</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
								/>
							</svg>
							<span>Upload</span>
						</button>
						<button
							type="button"
							className="bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
							onClick={async () => {
								init();

								const url = await navigator.clipboard.readText();
								setImage(url);
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="2"
								stroke="currentColor"
								className="size-5 mr-2"
							>
								<title>icon-paste</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
								/>
							</svg>

							<span>Paste Image URL</span>
						</button>
						<input
							ref={inputRef}
							className="hidden"
							type="file"
							onChange={(event) => {
								init();

								readerImage(event.target.files?.[0]);
							}}
						/>
					</div>

					<div className="flex space-x-4">
						<button
							type="button"
							className="bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
							onClick={() => {
								setChoiceList([0]);
								setScore(100);
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="2"
								stroke="currentColor"
								className="size-5 mr-2"
							>
								<title>icon-reset</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
								/>
							</svg>

							<span>Reset</span>
						</button>
						<button
							type="button"
							className="bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
							onClick={answer}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="2"
								stroke="currentColor"
								className="size-5 mr-2"
							>
								<title>icon-answer</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="m4.5 12.75 6 6 9-13.5"
								/>
							</svg>

							<span>Answer</span>
						</button>
					</div>
				</section>
			</article>
			<article className="container max-w-4xl mx-auto space-y-4 w-1/3">
				<div className="flex flex-shrink pt-4 justify-end">
					<p className="text-3xl bg-black/80 shadow-white shadow-lg rounded-lg p-2 w-48 flex flex-row justify-between">
						<span>Scoreboard</span>
					</p>
				</div>
				<section className="rounded-lg border-2 bg-black/80 shadow-2xl shadow-white/50 flex flex-col space-y-4 justify-center p-4">
					{playerList.map((player) => (
						<div
							key={player.id}
							className="flex flex-row w-full justify-between border-2 p-2 rounded-lg bg-white text-black"
						>
							<div>{player.name}</div>
							<div>{player.score}</div>
						</div>
					))}
				</section>
				<section className="w-full bg-black rounded-lg backdrop-blur-md bg-opacity-30 border border-gray-100 p-4">
					<div className="pb-4 flex flex-row justify-between items-center">
						<h3 className="text-3xl">Add Player</h3>
						<button
							type="button"
							disabled={!newPlayer}
							className="rounded-full bg-white h-8 w-8 flex justify-center items-center disabled:opacity-20"
							onClick={() => {
								if (newPlayer) {
									setPlayerStorage((prev) => [...prev, newPlayer]);
									setNewPlayer(null);
								}
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="2"
								stroke="currentColor"
								className="size-8 text-black"
							>
								<title>icon-plus</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 4.5v15m7.5-7.5h-15"
								/>
							</svg>
						</button>
					</div>
					<div>
						<input
							value={newPlayer?.name ?? ""}
							className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="player-name"
							type="text"
							placeholder="player name"
							onChange={(e) => {
								setNewPlayer({
									id: playersStorage.length + 1,
									name: e.target.value,
									score: 0,
								});
							}}
						/>
					</div>
				</section>
			</article>
		</main>
	);
}
