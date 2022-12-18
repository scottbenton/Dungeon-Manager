import { useEffect } from 'react';
import { useIsDarkMode } from '@/hooks/useDarkMode';
import { Text } from '@/components/Text';
import { spotifyApi } from '../../lib/spotifyApi';
import { PlaybackStatus } from '../../types/PlaybackStatus';
import { SpotifyMusicItem } from '../../types/SpotifyMusicItem';
import { SpotifyMusicTypes } from '../../types/SpotifyMusicTypes';
import { constructSpotifyURI } from '../../utils/constructSpotifyURI';
import spotifyIconLightThemeSRC from '../../assets/SpotifyIconBlack.png';
import spotifyIconDarkThemeSRC from '../../assets/SpotifyIconWhite.png';
import {
  ControlsSection,
  SpotifyPlayingText,
  StickyMusicControls,
} from './HeaderMusicPlayer.styles';
import { useSpotifyWebPlayer } from '../../hooks/useSpotifyWebPlayer';
import { MusicControl } from './MusicControl';

interface SpotifyMusicPlayerProps {
  item: SpotifyMusicItem;
  status: PlaybackStatus;
}

export function SpotifyMusicPlayer(props: SpotifyMusicPlayerProps) {
  const { item, status } = props;

  const isDarkMode = useIsDarkMode();

  const {
    spotifyPlayerRef,
    enabledControls,
    deviceId,
    currentTrack,
    shuffle,
    repeat,
  } = useSpotifyWebPlayer();

  useEffect(() => {
    console.debug('IN PLAY USEEFFECT');
    if (deviceId) {
      const uri = constructSpotifyURI(item.type, item.id);

      console.debug('URI', uri);
      const body =
        item.type === SpotifyMusicTypes.Song
          ? {
              uris: [uri],
            }
          : {
              context_uri: uri,
            };
      spotifyApi
        .put(`me/player/play?device_id=${deviceId}`, body)
        .catch((e) => {
          console.error(e);
        });
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      // spotifyPlayerRef.current?.pause();
    };
    // The spotifyPlayerRef returned from useSpotifyWebPlayer does not need to be added here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, deviceId]);

  const artists =
    currentTrack?.artists.reduce((collector, artist, index, arr) => {
      if (index === arr.length - 1) return collector + artist.name;
      return `${collector} ${artist.name}, `;
    }, '') || '';

  console.debug(repeat);

  return (
    <StickyMusicControls>
      <SpotifyPlayingText>
        <div>
          <img
            src={
              isDarkMode ? spotifyIconDarkThemeSRC : spotifyIconLightThemeSRC
            }
            alt={'From Spotify'}
          />
          <div>
            <Text variant={'overline'} textColor={'brandTertiary'}>
              Currently Playing
            </Text>
            {item.type !== SpotifyMusicTypes.Song && (
              <Text textColor={'brandPrimary'}>{item.label}</Text>
            )}
            <Text textColor={'brandPrimary'}>{currentTrack?.name}</Text>
            <Text textColor={'brandSecondary'} variant={'caption'}>
              {artists}
            </Text>
          </div>
        </div>
      </SpotifyPlayingText>
      <ControlsSection>
        <MusicControl
          label={'Repeat'}
          iconName={'repeat'}
          onClick={() => repeat.handleRepeatToggle(!repeat.enabled)}
          disabled={repeat.repeatLoading}
          selected={repeat.enabled}
        />
        <MusicControl
          label={'Previous'}
          iconName={'play-skip-back'}
          onClick={() => spotifyPlayerRef.current?.previousTrack()}
          disabled={!enabledControls.previous}
        />
        <MusicControl
          label={status === PlaybackStatus.Playing ? 'Pause' : 'Play'}
          iconName={status === PlaybackStatus.Playing ? 'pause' : 'play'}
          onClick={() => spotifyPlayerRef.current?.togglePlay()}
          disabled={
            status === PlaybackStatus.Playing
              ? !enabledControls.pause
              : !enabledControls.play
          }
        />
        <MusicControl
          label={'Next'}
          onClick={() => spotifyPlayerRef.current?.nextTrack()}
          iconName={'play-skip-forward'}
          disabled={!enabledControls.next}
        />
        <MusicControl
          label={'Shuffle'}
          onClick={() => {
            shuffle.handleShuffleToggle(!shuffle.enabled);
          }}
          disabled={shuffle.shuffleLoading}
          iconName={'shuffle'}
          selected={shuffle.enabled}
        />
      </ControlsSection>
    </StickyMusicControls>
  );
}
