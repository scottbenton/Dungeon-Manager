import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  generateCodeChallengeFromVerifier,
  generateCodeVerifier,
  generateRandomString,
  getRedirectUri,
} from "../../lib/authHelpers";
import { SpotifyAuthContext } from "./SpotifyAuthContext";
import Cookie from "js-cookie";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "";
const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET || "";

const spotifyAccountsApi = axios.create({
  baseURL: "https://accounts.spotify.com/api/",
});

const spotifyApi = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export function SpotifyProvider(props: PropsWithChildren) {
  const { children } = props;

  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isGettingAccessToken = useRef<boolean>(false);

  useEffect(() => {
    setRefreshToken(
      window.localStorage.getItem("spotifyRefreshToken") || undefined
    );
  }, []);

  const startLogin = useCallback(async () => {
    setIsLoading(true);
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallengeFromVerifier(codeVerifier);

    Cookie.set("spotifyVerifier", codeVerifier);
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    authUrl.searchParams.append("client_id", clientId);
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("redirect_uri", getRedirectUri());
    authUrl.searchParams.append("state", generateRandomString(16));
    authUrl.searchParams.append(
      "scope",
      "user-modify-playback-state user-read-playback-state user-read-currently-playing app-remote-control streaming"
    );
    authUrl.searchParams.append("code_challenge_method", "S256");
    authUrl.searchParams.append("code_challenge", codeChallenge);

    location.assign(authUrl);
  }, []);

  const completeLogin = useCallback((code: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      const verifier = Cookie.get("spotifyVerifier") || "";
      Cookie.remove("spotifyVerifier");

      const params = new URLSearchParams();
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri", getRedirectUri());
      params.append("client_id", clientId);
      params.append("code_verifier", verifier);

      spotifyAccountsApi
        .post("token", params, {
          headers: {
            Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          console.log(response);
          window.localStorage.setItem(
            "spotifyRefreshToken",
            response.data.refresh_token
          );
          setAccessToken(response.data.access_token);
          setRefreshToken(response.data.refresh_token);
          setIsLoading(false);
          resolve("Success");
        })
        .catch((error) => {
          setIsLoading(false);
          reject(error);
        });
    });
  }, []);

  const getNewAccessTokenUsingRefreshToken = useCallback(
    (token: string) =>
      new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append("grant_type", "refresh_token");
        params.append("refresh_token", token);

        spotifyAccountsApi
          .post("token", params, {
            headers: {
              Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`,
            },
          })
          .then((response) => {
            setAccessToken(response.data.access_token);
            resolve(response.data.access_token);
          })
          .catch(() => {
            reject("Failure");
          });
      }),
    []
  );

  useEffect(() => {
    if (refreshToken && !accessToken && !isGettingAccessToken.current) {
      isGettingAccessToken.current = true;
      getNewAccessTokenUsingRefreshToken(refreshToken)
        .catch(() => {
          setRefreshToken(undefined);
          window.localStorage.removeItem("spotifyRefreshToken");
          startLogin();
        })
        .finally(() => {
          isGettingAccessToken.current = false;
        });
    }
  }, [
    refreshToken,
    accessToken,
    getNewAccessTokenUsingRefreshToken,
    startLogin,
  ]);

  useEffect(() => {
    const tokenInterceptor = spotifyApi.interceptors.request.use((config) => {
      if (config && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    });
    spotifyApi.interceptors.response.use((config) => {});

    return () => {
      spotifyApi.interceptors.request.eject(tokenInterceptor);
    };
  }, [accessToken]);

  useEffect(() => {
    if (refreshToken) {
      createAuthRefreshInterceptor(
        spotifyApi,
        (failedRequest) =>
          new Promise((resolve, reject) => {
            getNewAccessTokenUsingRefreshToken(refreshToken)
              .then((token) => {
                failedRequest.response.config.headers[
                  "Authorization"
                ] = `Bearer ${token}`;
                resolve(undefined);
              })
              .catch((error) => {
                reject(error);
              });
          })
      );
    }
  }, [getNewAccessTokenUsingRefreshToken, refreshToken]);

  return (
    <SpotifyAuthContext.Provider
      value={{
        startLogin,
        completeLogin,
        isLoggedIn: !!refreshToken,
        isLoading,
        api: spotifyApi,
      }}
    >
      {children}
    </SpotifyAuthContext.Provider>
  );
}
