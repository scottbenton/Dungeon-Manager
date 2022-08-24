import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { PropsWithChildren, useEffect, useState } from "react";
import { auth, handleGoogleSignIn } from "../../firebase/firebase";
import { useFeedback } from "../FeedbackProvider";
import { AuthContext } from "./AuthContext";

export function AuthProvider(props: PropsWithChildren) {
  const { children } = props;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { updateLoadingKey } = useFeedback();

  const [user, setUser] = useState<User>();

  useEffect(() => {
    updateLoadingKey("auth", true);
    setIsLoading(true);
    const cancel = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user ?? undefined);
        updateLoadingKey("auth", false);
        setIsLoading(false);
      },
      (error) => {
        console.error(error);
        setUser(undefined);
        updateLoadingKey("auth", false);
        setIsLoading(false);
      }
    );
    return () => {
      cancel();
    };
  }, [updateLoadingKey]);

  const signInWithGoogle = () => {
    handleGoogleSignIn();
  };

  const logout = () => {
    signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, signInWithGoogle, signOut: logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
