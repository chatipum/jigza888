"use client";

import { type Players, atomPlayers } from "@/atom";
import { useAtom } from "jotai";
import { createContext } from "react";

export type Props = {
	players: Players[];
	setPlayers?: React.Dispatch<React.SetStateAction<Players[]>>;
};

export const PlayerCtx = createContext<Props>({
	players: [],
});

export default function Provider({ children }: { children: React.ReactNode }) {
	const [players, setPlayers] = useAtom(atomPlayers);

	return (
		<PlayerCtx.Provider value={{ players, setPlayers }}>
			{children}
		</PlayerCtx.Provider>
	);
}
