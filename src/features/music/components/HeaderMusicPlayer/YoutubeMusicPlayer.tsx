import { useCallback, useEffect, useRef } from 'react';
import { Text } from '@/components/Text';
import { useReduxDispatch } from '@/hooks/reduxHooks';
import { PlaybackStatus } from '../../types/PlaybackStatus';
import { YoutubeMusicItem } from '../../types/YoutubeMusicItem';
import { YouTubePlayerAPI, YoutubeVideoPlayer } from '../YoutubeVideoPlayer';
import {
  ControlsSection,
  LabelsSection,
  StickyMusicControls,
} from './HeaderMusicPlayer.styles';
import { YoutubeMusicTypes } from '../../types/YoutubeMusicTypes';
import { updatePlaybackStatus } from '../../stores/musicSlice';
import { MusicControl } from './MusicControl';

export interface YoutubeMusicPlayerProps {
  item: YoutubeMusicItem;
  status: PlaybackStatus;
}

export function YoutubeMusicPlayer(props: YoutubeMusicPlayerProps) {
  const { item, status } = props;
  const { id, type } = item;
  const youtubeApi = useRef<YouTubePlayerAPI>();

  const dispatch = useReduxDispatch();

  const updateStatus = useCallback(
    (newStatus: PlaybackStatus) => {
      dispatch(updatePlaybackStatus(newStatus));
    },
    [dispatch]
  );

  const startMusic = useCallback(() => {
    if (type === YoutubeMusicTypes.Video) {
      youtubeApi.current?.loadVideoById(id);
    } else {
      youtubeApi.current?.loadPlaylist({ list: id });
    }
  }, [id, type]);

  const handlePlayPause = () => {
    if (status === PlaybackStatus.Ready || status === PlaybackStatus.Finished) {
      startMusic();
      updateStatus(PlaybackStatus.Playing);
    } else if (status === PlaybackStatus.Paused) {
      youtubeApi.current?.playVideo();
      updateStatus(PlaybackStatus.Playing);
    } else {
      youtubeApi.current?.pauseVideo();
      updateStatus(PlaybackStatus.Paused);
    }
  };

  const showPreviousAndNextButtons = item.type === YoutubeMusicTypes.Playlist;

  const handlePrevious = () => {
    youtubeApi.current?.previousVideo();
  };

  const handleNext = () => {
    youtubeApi.current?.nextVideo();
  };

  useEffect(() => {
    startMusic();
  }, [startMusic]);

  return (
    <>
      <StickyMusicControls
        isMobile={{
          '@initial': true,
          '@md': false,
        }}
      >
        <LabelsSection>
          <Text
            textColor={'brandTertiary'}
            variant={'overline'}
            css={{ fontSize: '$text-xs' }}
          >
            Currently Playing
          </Text>
          <Text textColor={'brandPrimary'} variant={'body'}>
            {item.label}
          </Text>
        </LabelsSection>
        <ControlsSection>
          {showPreviousAndNextButtons && (
            <MusicControl
              label={'Previous'}
              iconName={'skip_previous'}
              onClick={() => handlePrevious()}
            />
          )}
          <MusicControl
            label={status === PlaybackStatus.Playing ? 'Pause' : 'Play'}
            iconName={
              status === PlaybackStatus.Playing ? 'pause' : 'play_arrow'
            }
            onClick={() => handlePlayPause()}
          />
          {showPreviousAndNextButtons && (
            <MusicControl
              label={'Next'}
              iconName={'skip_next'}
              onClick={() => handleNext()}
            />
          )}
        </ControlsSection>
      </StickyMusicControls>
      <YoutubeVideoPlayer
        playerRef={youtubeApi}
        onReady={() => startMusic()}
        onPlay={() => updateStatus(PlaybackStatus.Playing)}
        onPause={() => updateStatus(PlaybackStatus.Paused)}
        onEnd={() => updateStatus(PlaybackStatus.Finished)}
      />
    </>
  );
}
