import { AxiosInstance } from "axios";
import { createContext } from "react";

export interface ISpotifyAuthContext {
  startLogin: () => void;
  completeLogin: (code: string) => Promise<string>;
  isLoggedIn: boolean;
  isLoading: boolean;
  userName?: string;
  api: AxiosInstance;
}

export const SpotifyAuthContext = createContext<ISpotifyAuthContext>({
  startLogin: () => {},
  completeLogin: (code: string) => new Promise(() => {}),
  isLoggedIn: false,
  isLoading: true,
  api: {} as any,
});
