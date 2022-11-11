import { useReduxSelector } from '@/hooks/reduxHooks';
import { MusicSource } from '../../types/MusicSource';
import { PlaybackStatus } from '../../types/PlaybackStatus';
import { MusicPlayerContainer } from './HeaderMusicPlayer.styles';
import { YoutubeMusicPlayer } from './YoutubeMusicPlayer';

export function HeaderMusicPlayer(): JSX.Element {
  const { status, item } = useReduxSelector((state) => ({
    status: state.music.playbackState.status,
    item: state.music.playbackState.item,
  }));

  if (status === PlaybackStatus.NotSelected || !item) {
    return <></>;
  }

  return (
    <MusicPlayerContainer>
      <div>
        {item.source === MusicSource.Youtube && (
          <YoutubeMusicPlayer item={item} status={status} />
        )}
      </div>
    </MusicPlayerContainer>
  );
}
