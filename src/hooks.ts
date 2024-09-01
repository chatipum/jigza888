import { useContext } from "react";
import { PlayerCtx } from "./app/Provider";

export function usePlayers() {
	return useContext(PlayerCtx);
}
