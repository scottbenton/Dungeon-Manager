import { EmptyState } from '@/components/EmptyState';
import { Text } from '@/components/Text';
import { useReduxDispatch, useReduxSelector } from '@/hooks/reduxHooks';
import { MusicCard } from './MusicCard';
import { CardGrid } from './MusicCardList.styles';
import { MusicSource } from '../../types/MusicSource';
import { deleteMusicItem, startPlayback } from '../../stores/musicSlice';
import { SpotifyAuthSection } from '../SpotifyAuthSection';

export interface MusicCardListProps {
  openAddMusicDialog: () => void;
}

export function MusicCardList(props: MusicCardListProps) {
  const { openAddMusicDialog } = props;

  const { items, currentMusicId, isAuthenticatedWithSpotify } =
    useReduxSelector((state) => ({
      items: state.music.musicItems,
      currentMusicId: state.music.playbackState.item?.id,
      isAuthenticatedWithSpotify: !!state.music.spotifyAuth.refreshToken,
    }));
  const dispatch = useReduxDispatch();

  const handlePlay = (id: string, source: MusicSource) => {
    dispatch(startPlayback({ id, source }));
  };

  const handleDelete = (id: string, source: MusicSource) => {
    dispatch(deleteMusicItem({ id, source }));
  };

  if (
    Object.keys(items.spotify).length === 0 &&
    Object.keys(items.youtube).length === 0
  ) {
    return (
      <EmptyState
        message={'Add music to get started'}
        IconEntry={'music_note'}
        callToAction={{
          children: 'Add Music',
          color: 'brand',
          variant: 'primary',
          endIcon: 'add',
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
            handleDelete={() => handleDelete(key, MusicSource.Youtube)}
          />
        ))}
      </CardGrid>
      <Text
        textColor={'textSecondary'}
        variant={'overline'}
        css={{ marginTop: '$s-8' }}
      >
        Spotify Music
      </Text>
      {isAuthenticatedWithSpotify ? (
        <CardGrid
          columns={{
            '@sm': 2,
            '@md': 3,
          }}
          css={{
            // Mobile View Fab doesn't overlap
            marginBottom: '$s-16',
          }}
        >
          {Object.keys(items.spotify).map((key) => (
            <MusicCard
              key={key}
              item={items.spotify[key]}
              isPlaying={currentMusicId === items.spotify[key].id}
              handlePlay={() => handlePlay(key, MusicSource.Spotify)}
              handleDelete={() => handleDelete(key, MusicSource.Spotify)}
            />
          ))}
        </CardGrid>
      ) : (
        <SpotifyAuthSection />
      )}
    </>
  );
}
