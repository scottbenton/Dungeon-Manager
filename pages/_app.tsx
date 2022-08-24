import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@fontsource/aboreto"; // Defaults to weight 400.
import "@fontsource/rubik/variable-full.css";
import { AppProviders } from "../providers/AppProviders";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Dungeon Manager</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#b91c1c" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <AppProviders>
        <Component {...pageProps} />
      </AppProviders>
    </>
  );
}

export default MyApp;
