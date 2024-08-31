import { usePlayers } from "@/hooks";
import { useState } from "react";

export default function CardAddPlayer() {
	const [playersStorage, setPlayerStorage] = usePlayers();

	const [newPlayerName, setNewPlayerName] = useState<string>("");

	return (
		<div className="w-full bg-black rounded-lg backdrop-blur-md bg-opacity-30 border border-gray-100 p-4">
			<div className="pb-4 flex flex-row justify-between items-center">
				<h3 className="text-3xl">Add Player</h3>
				<button
					type="button"
					disabled={!newPlayerName}
					className="rounded-full bg-white h-8 w-8 flex justify-center items-center disabled:opacity-20"
					onClick={(e) => {
						e.preventDefault();

						const lastPlayer =
							playersStorage.length === 1
								? playersStorage[0]
								: playersStorage.sort((a, b) => a.id - b.id)[
										playersStorage.length - 1
									];

						if (lastPlayer) {
							setPlayerStorage((prev) => [
								...prev,
								{
									id: lastPlayer.id + 1,
									name: newPlayerName,
									score: 0,
								},
							]);
						}

						setNewPlayerName("");
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
					value={newPlayerName}
					className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="player-name"
					type="text"
					placeholder="player name"
					onChange={(e) => {
						setNewPlayerName(e.target.value);
					}}
				/>
			</div>
		</div>
	);
}
