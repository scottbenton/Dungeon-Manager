import { User } from "firebase/auth";
import { createContext } from "react";

interface IAuthContext {
  user?: User;
  isLoading: boolean;
  signInWithGoogle: () => void;
  signOut: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  isLoading: false,
  signInWithGoogle: () => {},
  signOut: () => {},
});
