"use client";

import type { Players } from "@/atom";
import CardAddPlayer from "@/components/CardAddPlayer";
import IconRemove from "@/components/icons/Remove";
import { usePlayers } from "@/hooks";
import { without } from "es-toolkit";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	const { players, setPlayers } = usePlayers();

	const onClickRemove = (player: Players) => {
		const playersAfterRemove = without(players, player);

		if (!setPlayers) return;

		setPlayers(playersAfterRemove);
	};

	return (
		<main className="relative h-screen w-screen">
			<article className="container mx-auto flex flex-col justify-center items-center h-full space-y-4">
				<Image
					src="/jigza-icon.png"
					alt="jigza-icon"
					width={200}
					height={200}
					className="animate-bounce"
				/>
				<h1 className="text-7xl text-black dark:text-white font-extrabold">
					JIGZA888
				</h1>

				<section className="w-[25rem] space-y-4">
					<CardAddPlayer />

					<div className="flex flex-wrap justify-center space-x-4">
						{players.map((player) => (
							<div
								key={player.id}
								className="rounded-xl bg-black dark:bg-white text-white dark:text-black flex space-x-2 p-2"
							>
								<p className="text-lg">{player.name}</p>
								<button
									type="button"
									className="flex items-center"
									onClick={() => {
										onClickRemove(player);
									}}
								>
									<IconRemove className="text-white dark:text-black" />
								</button>
							</div>
						))}
					</div>

					<div className="absolute inset-x-0 bottom-0 flex justify-center pb-4">
						<button
							type="button"
							disabled={players.length === 0}
							className="bg-black dark:bg-white hover:bg-gray-200 disabled:hover:bg-white disabled:opacity-20 w-40 text-gray-800 font-bold py-2 px-4 rounded-xl text-3xl"
							onClick={() => {
								router.push("/game");
							}}
						>
							<span className="bg-gradient-to-r from-blue-950 via-orange-600 to-yellow-600 inline-block text-transparent bg-clip-text">
								Let's Go
							</span>
						</button>
					</div>
				</section>
			</article>
		</main>
	);

	// return (
	// 	<main className="relative h-screen bg-[url('https://images2.alphacoders.com/128/thumb-1920-1281008.jpg')]">
	// 		<article className="container max-w-4xl mx-auto flex flex-col justify-center items-center h-full space-y-4">
	// 			<section className="w-[25rem]">
	// 				<CardAddPlayer />
	// 			</section>
	// 			<section className="flex flex-wrap space-x-4">
	// 				{players.map((player) => (
	// 					<div
	// 						key={player.id}
	// 						className="rounded-lg bg-white text-black flex space-x-2 p-2 my-2"
	// 					>
	// 						<p className="text-lg">{player.name}</p>
	// 						<button
	// 							onClick={() => {
	// 								if (!setPlayers) return;

	// 								setPlayers((prev) =>
	// 									prev.filter((val) => val.id !== player.id),
	// 								);
	// 							}}
	// 							type="button"
	// 							className="flex items-center"
	// 						>
	// 							<svg
	// 								xmlns="http://www.w3.org/2000/svg"
	// 								fill="none"
	// 								viewBox="0 0 24 24"
	// 								strokeWidth="2"
	// 								stroke="currentColor"
	// 								className="size-6 cursor-pointer"
	// 							>
	// 								<title>icon-close</title>
	// 								<path
	// 									strokeLinecap="round"
	// 									strokeLinejoin="round"
	// 									d="M6 18 18 6M6 6l12 12"
	// 								/>
	// 							</svg>
	// 						</button>
	// 					</div>
	// 				))}
	// 			</section>
	// 			<section className="absolute inset-x-0 bottom-0 flex justify-center">
	// 				<button
	// 					type="button"
	// 					disabled={players.length === 0}
	// 					className="bg-white hover:bg-gray-200 disabled:hover:bg-white disabled:opacity-20 w-64 text-gray-800 font-bold py-2 px-4 rounded"
	// 					onClick={() => {
	// 						if (!setPlayers) return;

	// 						setPlayers(players);
	// 						router.push("/game");
	// 					}}
	// 				>
	// 					Let's Go
	// 				</button>
	// 			</section>
	// 		</article>
	// 	</main>
	// );
}
