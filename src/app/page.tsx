"use client";

import type { Players } from "@/atom";
import { usePlayers } from "@/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
	const [playersStorage, setPlayerStorage] = usePlayers();
	const router = useRouter();

	const [players, setPlayers] = useState<Players[]>([]);
	const [player, setPlayer] = useState<Players | null>(null);

	useEffect(() => {
		setPlayers(playersStorage);
	}, [playersStorage]);

	return (
		<main className="relative h-screen bg-[url('https://images2.alphacoders.com/128/thumb-1920-1281008.jpg')]">
			<article className="container max-w-4xl mx-auto flex flex-col justify-center items-center h-full space-y-4">
				<section className="w-[25rem] bg-black rounded-lg backdrop-blur-md bg-opacity-30 border border-gray-100 p-4">
					<div className="pb-4 flex flex-row justify-between items-center">
						<h3 className="text-3xl">Add Player</h3>
						<button
							type="button"
							disabled={!player}
							className="rounded-full bg-white h-8 w-8 flex justify-center items-center disabled:opacity-20"
							onClick={() => {
								if (player) {
									setPlayers((prev) => [...prev, player]);
									setPlayer(null);
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
							value={player?.name ?? ""}
							className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="player-name"
							type="text"
							placeholder="player name"
							onChange={(e) => {
								setPlayer({
									id: players.length + 1,
									name: e.target.value,
									score: 0,
								});
							}}
						/>
					</div>
				</section>
				<section className="flex flex-wrap space-x-4">
					{players.map((player) => (
						<div
							key={player.id}
							className="rounded-lg bg-white text-black flex space-x-2 p-2 my-2"
						>
							<p className="text-lg">{player.name}</p>
							<button
								onClick={() => {
									setPlayers((prev) =>
										prev.filter((val) => val.id !== player.id),
									);
								}}
								type="button"
								className="flex items-center"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="currentColor"
									className="size-6 cursor-pointer"
								>
									<title>icon-close</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18 18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
					))}
				</section>
				<section className="absolute inset-x-0 bottom-0 flex justify-center">
					<button
						type="button"
						disabled={players.length === 0}
						className="bg-white hover:bg-gray-200 disabled:hover:bg-white disabled:opacity-20 w-64 text-gray-800 font-bold py-2 px-4 rounded"
						onClick={() => {
							setPlayerStorage(players);
							router.push("/game");
						}}
					>
						Let's Go
					</button>
				</section>
			</article>
		</main>
	);
}
