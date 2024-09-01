import { usePlayers } from "@/hooks";

export default function CardLeaderBoard() {
	const { players } = usePlayers();

	return (
		<div className="rounded-lg border-2 bg-black/80 shadow-2xl shadow-white/50 flex flex-col space-y-4 justify-center p-4">
			{players.map((player) => (
				<div
					key={player.id}
					className="flex flex-row w-full justify-between border-2 p-2 rounded-lg bg-white text-black"
				>
					<div>{player.name}</div>
					<div>{player.score}</div>
				</div>
			))}
		</div>
	);
}
