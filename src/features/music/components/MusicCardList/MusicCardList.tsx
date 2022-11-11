import { EmptyState } from '@/components/EmptyState';
import { Text } from '@/components/Text';
import { useReduxDispatch, useReduxSelector } from '@/hooks/reduxHooks';
import MusicIcon from '@heroicons/react/24/outline/MusicalNoteIcon';
import AddIcon from '@heroicons/react/20/solid/PlusIcon';
import { MusicCard } from './MusicCard';
import { CardGrid } from './MusicCardList.styles';
import { MusicSource } from '../../types/MusicSource';
import { startPlayback } from '../../stores/musicSlice';

export interface MusicCardListProps {
  openAddMusicDialog: () => void;
}

export function MusicCardList(props: MusicCardListProps) {
  const { openAddMusicDialog } = props;

  const { items, currentMusicId } = useReduxSelector((state) => ({
    items: state.music.musicItems,
    currentMusicId: state.music.playbackState.item?.id,
  }));
  const dispatch = useReduxDispatch();

  const handlePlay = (id: string, source: MusicSource) => {
    dispatch(startPlayback({ id, source }));
  };

  if (
    Object.keys(items.spotify).length === 0 &&
    Object.keys(items.youtube).length === 0
  ) {
    return (
      <EmptyState
        message={'Add music to get started'}
        Icon={MusicIcon}
        callToAction={{
          children: 'Add Music',
          color: 'brand',
          variant: 'primary',
          endIcon: AddIcon,
          onClick: () => openAddMusicDialog(),
        }}
      />
    );
  }

  return (
    <>
      <Text
        textColor={'textSecondary'}
        variant={'overline'}
        css={{ marginTop: '$s-8' }}
      >
        Youtube Music
      </Text>
      <CardGrid
        columns={{
          '@sm': 2,
          '@md': 3,
        }}
      >
        {Object.keys(items.youtube).map((key) => (
          <MusicCard
            key={key}
            item={items.youtube[key]}
            isPlaying={currentMusicId === items.youtube[key].id}
            handlePlay={() => handlePlay(key, MusicSource.Youtube)}
          />
        ))}
      </CardGrid>
    </>
  );
}
