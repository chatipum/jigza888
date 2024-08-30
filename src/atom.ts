import { atomWithStorage } from "jotai/utils";

export interface Players {
	id: number;
	name: string;
	score: number;
}

export const atomPlayers = atomWithStorage<Players[]>("players", []);
