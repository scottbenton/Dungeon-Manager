import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Text } from '@/components/Text';
import PlayIcon from '@heroicons/react/20/solid/PlayIcon';
import PlayingIcon from '@heroicons/react/20/solid/SpeakerWaveIcon';
import { SpotifyMusicItem } from '../../types/SpotifyMusicItem';
import { YoutubeMusicItem } from '../../types/YoutubeMusicItem';
import { MusicCardFooter } from './MusicCardList.styles';
import { SourceIcon } from './SourceIcon';

export interface MusicCardProps {
  item: YoutubeMusicItem | SpotifyMusicItem;
  isPlaying: boolean;
  handlePlay: () => void;
}

export function MusicCard(props: MusicCardProps) {
  const { item, handlePlay, isPlaying } = props;
  const { label, source } = item;

  return (
    <Card>
      <Text
        textColor={'textSecondary'}
        variant={'h4'}
        css={{
          paddingX: '$s-1',
          paddingY: '$s-2',
          fontWeight: '$light',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {label || 'Loading...'}
      </Text>
      <MusicCardFooter>
        <SourceIcon source={source} />
        <Button
          size={'md'}
          color={'brand'}
          variant={'secondary'}
          rounded
          endIcon={isPlaying ? PlayingIcon : PlayIcon}
          disabled={isPlaying}
          onClick={() => handlePlay()}
        >
          {isPlaying ? 'Playing' : 'Play'}
        </Button>
      </MusicCardFooter>
    </Card>
  );
}
