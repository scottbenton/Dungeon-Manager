import { PropsWithChildren } from "react";
import { AuthProvider } from "./AuthProvider";
import { FeedbackProvider } from "./FeedbackProvider";
import { SpotifyProvider } from "./SpotifyProvider";

export function AppProviders(props: PropsWithChildren) {
  const { children } = props;
  return (
    <FeedbackProvider>
      <AuthProvider>
        <SpotifyProvider>{children}</SpotifyProvider>
      </AuthProvider>
    </FeedbackProvider>
  );
}
