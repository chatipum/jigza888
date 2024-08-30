import { useAtom } from "jotai";
import { atomPlayers } from "./atom";

export function usePlayers() {
	return useAtom(atomPlayers);
}
