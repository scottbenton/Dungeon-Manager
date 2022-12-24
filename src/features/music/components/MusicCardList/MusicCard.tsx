import { Button } from '@/components/Button';
import { IconButton } from '@/components/Button/IconButton';
import { Card } from '@/components/Card';
import { Text } from '@/components/Text';
import { SpotifyMusicItem } from '../../types/SpotifyMusicItem';
import { YoutubeMusicItem } from '../../types/YoutubeMusicItem';
import { MusicCardFooter, MusicCardHeader } from './MusicCardList.styles';
import { SourceIcon } from './SourceIcon';

export interface MusicCardProps {
  item: YoutubeMusicItem | SpotifyMusicItem;
  isPlaying: boolean;
  handlePlay: () => void;
  handleDelete: () => void;
}

export function MusicCard(props: MusicCardProps) {
  const { item, handlePlay, isPlaying, handleDelete } = props;
  const { label, source } = item;

  return (
    <Card>
      <MusicCardHeader>
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
        <IconButton iconName={'close'} onClick={() => handleDelete()} />
      </MusicCardHeader>
      <MusicCardFooter>
        <SourceIcon source={source} />
        <Button
          size={'md'}
          color={'brand'}
          variant={'secondary'}
          rounded
          endIcon={isPlaying ? 'volume-medium' : 'play'}
          disabled={isPlaying}
          onClick={() => handlePlay()}
        >
          {isPlaying ? 'Playing' : 'Play'}
        </Button>
      </MusicCardFooter>
    </Card>
  );
}
