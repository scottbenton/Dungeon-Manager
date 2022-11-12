import Youtube, { YouTubeEvent } from 'react-youtube';
import { YoutubeWrapper } from './YoutubeVideoPlayer.styles';

export type YouTubePlayerAPI = YouTubeEvent['target'];

export interface YoutubeVideoPlayerProps {
  playerRef: React.MutableRefObject<YouTubePlayerAPI>;
  onReady: () => void;
  onPlay: () => void;
  onPause: () => void;
  onEnd: () => void;
}

const defaultOpts = {
  playerVars: {
    modestbranding: 1,
    autoplay: 1,
  },
  width: '100%',
  height: '100%',
};

export function YoutubeVideoPlayer(props: YoutubeVideoPlayerProps) {
  const { playerRef, onReady, onPlay, onPause, onEnd } = props;

  const onPlayerReady = (evt: YouTubeEvent) => {
    playerRef.current = evt.target;

    onReady();
  };

  return (
    <YoutubeWrapper>
      <Youtube
        opts={defaultOpts}
        onReady={onPlayerReady}
        onPlay={onPlay}
        onPause={onPause}
        onEnd={onEnd}
      />
    </YoutubeWrapper>
  );
}
