import { useContext } from "react";
import { SpotifyAuthContext } from "./SpotifyAuthContext";

export function useSpotifyAuth() {
  return useContext(SpotifyAuthContext);
}
