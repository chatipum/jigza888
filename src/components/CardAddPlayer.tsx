import { usePlayers } from "@/hooks";
import { last, sortBy } from "es-toolkit";
import { useState } from "react";
import IconPlus from "./icons/Plus";

export default function CardAddPlayer() {
	const { players, setPlayers } = usePlayers();

	const [playerName, setPlayerName] = useState<string>("");

	const onClickAddPlayer = () => {
		const sortPlayersById = sortBy(players, ["id"]);
		const lastPlayerId = last(sortPlayersById)?.id ?? 0;

		if (setPlayers) {
			setPlayers((prev) => [
				...prev,
				{
					id: lastPlayerId + 1,
					name: playerName,
					score: 0,
				},
			]);
		}

		setPlayerName("");
	};

	return (
		<div className="w-full bg-black rounded-3xl backdrop-blur-md bg-opacity-30 border border-gray-600 p-4">
			<div className="pb-4 flex flex-row justify-between items-center">
				<h3 className="text-3xl text-black dark:text-white">Add Player</h3>
				<button
					type="button"
					disabled={!playerName}
					className="disabled:opacity-20 ease-in duration-200"
					onClick={onClickAddPlayer}
				>
					<IconPlus className="size-8 text-black dark:text-white" />
				</button>
			</div>
			<div>
				<input
					value={playerName}
					className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
					id="player-name"
					type="text"
					placeholder="player name"
					onChange={(e) => {
						setPlayerName(e.target.value);
					}}
				/>
			</div>
		</div>
	);
}
