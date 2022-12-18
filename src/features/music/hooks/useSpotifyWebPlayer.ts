import { useReduxDispatch } from '@/hooks/reduxHooks';
import { store } from '@/stores/store';
import { useEffect, useRef, useState } from 'react';
import { spotifyApi } from '../lib/spotifyApi';
import { updatePlaybackStatus } from '../stores/musicSlice';
import { PlaybackStatus } from '../types/PlaybackStatus';

export function useSpotifyWebPlayer() {
  const dispatch = useReduxDispatch();

  const [sdkReady, setSDKReady] = useState<boolean>(false);
  const spotifyPlayerRef = useRef<Spotify.Player>();

  const [deviceId, setDeviceId] = useState<string>();
  const [currentTrack, setCurrentTrack] = useState<Spotify.Track>();
  const [enabledControls, setEnabledControls] = useState<{
    play: boolean;
    pause: boolean;
    previous: boolean;
    next: boolean;
  }>({
    play: false,
    pause: false,
    previous: false,
    next: false,
  });

  const [shuffleEnabled, setShuffleEnabled] = useState<boolean>(false);
  const [shuffleLoading, setShuffleLoading] = useState<boolean>(false);

  const [repeatEnabled, setRepeatEnabled] = useState<boolean>(false);
  const [repeatLoading, setRepeatLoading] = useState<boolean>(false);

  useEffect(() => {
    console.debug('In spotify setup useEffect');
    if (!document.getElementById('spotify-player-script')) {
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      script.id = 'spotify-player-script';

      document.body.appendChild(script);
    }
    window.onSpotifyWebPlaybackSDKReady = () => {
      console.debug('SDK Ready');
      setSDKReady(true);
    };

    if (window.Spotify?.Player) {
      setSDKReady(true);
    }
  }, []);

  useEffect(() => {
    console.debug(
      'In Create player useEffect',
      sdkReady,
      spotifyPlayerRef.current
    );
    if (sdkReady && !spotifyPlayerRef.current) {
      const player = new Spotify.Player({
        name: 'Dungeon Manager',
        getOAuthToken: (callback) =>
          callback(store.getState().music.spotifyAuth.accessToken ?? ''),
      });
      player.connect();
      console.debug('Player Created');
      player.addListener('ready', (readyState) => {
        setDeviceId(readyState.device_id);
        dispatch(updatePlaybackStatus(PlaybackStatus.Ready));
      });
      player.addListener('not_ready', () => {
        dispatch(updatePlaybackStatus(PlaybackStatus.Finished));
      });

      spotifyPlayerRef.current = player;

      player.addListener(
        'player_state_changed',
        ({
          paused,
          disallows,
          track_window: trackWindow,
          shuffle,
          repeat_mode: repeatMode,
        }) => {
          const { current_track: track } = trackWindow || {};
          setCurrentTrack(track);

          setEnabledControls({
            play: !disallows.resuming,
            pause: !disallows.pausing,
            previous: !disallows.skipping_prev,
            next: !disallows.skipping_next,
          });

          setShuffleEnabled(shuffle);
          setRepeatEnabled(repeatMode === 1);
          console.debug(repeatMode);

          let status: PlaybackStatus = PlaybackStatus.Playing;
          // We are paused and cannot play
          if (paused && disallows.resuming) {
            status = PlaybackStatus.Finished;
          } else if (paused) {
            status = PlaybackStatus.Paused;
          }
          dispatch(updatePlaybackStatus(status));
        }
      );
    }

    return () => {
      console.debug('Clearing Player');
      spotifyPlayerRef.current?.disconnect();
      spotifyPlayerRef.current = undefined;
      setDeviceId(undefined);
    };
  }, [dispatch, sdkReady]);

  const handleShuffleToggle = (shouldShuffle?: boolean) => {
    setShuffleLoading(true);
    spotifyApi
      .put(`me/player/shuffle?state=${shouldShuffle}`)
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setShuffleLoading(false);
      });
  };

  const handleRepeatToggle = (shouldRepeat?: boolean) => {
    setRepeatLoading(true);
    spotifyApi
      .put(`me/player/repeat?state=${shouldRepeat ? 'context' : 'off'}`)
      .then(() => {
        setRepeatEnabled(shouldRepeat || false);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setRepeatLoading(false);
      });
  };

  return {
    spotifyPlayerRef,
    enabledControls,
    currentTrack,
    deviceId,
    shuffle: {
      enabled: shuffleEnabled,
      shuffleLoading,
      handleShuffleToggle,
    },
    repeat: {
      enabled: repeatEnabled,
      repeatLoading,
      handleRepeatToggle,
    },
  };
}
