import { MusicSource } from '../../types/MusicSource';
import SpotifyIconUrl from '../../assets/spotify-icon.png';
import YoutubeIconUrl from '../../assets/youtube-icon.png';

export interface SourceIconProps {
  source: MusicSource;
}

export function SourceIcon(props: SourceIconProps) {
  const { source } = props;

  switch (source) {
    case MusicSource.Spotify:
      return <img src={SpotifyIconUrl} alt={source} />;
      break;
    case MusicSource.Youtube:
      return <img src={YoutubeIconUrl} alt={source} />;
      break;
    default:
      return <span />;
      break;
  }
}
