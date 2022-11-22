import { Text } from '@/components/Text';
import { useReduxDispatch } from '@/hooks/reduxHooks';
import { useEffect, useState } from 'react';
import { Button } from '@/components/Button';
import AddIcon from '@heroicons/react/24/outline/PlusIcon';
import { createMusicListener } from '../stores/musicSlice';
import { MusicCardList } from '../components/MusicCardList';
import { AddMusicDialog } from '../components/AddMusicDialog';
import { SpotifyAuthSection } from '../components/SpotifyAuthSection';

export default function MusicPage() {
  const dispatch = useReduxDispatch();

  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = dispatch(createMusicListener);
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <>
      <Text as={'h1'} variant={'pageTitle'}>
        Music
      </Text>
      <Text textColor={'textSecondary'} css={{ marginTop: '$s-4' }}>
        Add your favorite Youtube music and playlists to control playback
        throughout the application.
        <br />
        {/* Organize your music using tags to quickly find the right music for the
        moment. */}
      </Text>
      <SpotifyAuthSection />
      <MusicCardList openAddMusicDialog={() => setAddDialogOpen(true)} />
      <Button
        rounded
        variant={'primary'}
        color={'brand'}
        size={'lg'}
        css={{
          position: 'absolute',
          bottom: '$s-4',
          right: '$s-4',
          boxShadow: '$md',
        }}
        endIcon={AddIcon}
        onClick={() => setAddDialogOpen(true)}
      >
        Add Music
      </Button>
      <AddMusicDialog open={addDialogOpen} setOpen={setAddDialogOpen} />
    </>
  );
}
