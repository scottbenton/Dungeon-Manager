import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@fontsource/aboreto"; // Defaults to weight 400.
import "@fontsource/rubik/variable-full.css";
import { AppProviders } from "../providers/AppProviders";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProviders>
      <Component {...pageProps} />
    </AppProviders>
  );
}

export default MyApp;
