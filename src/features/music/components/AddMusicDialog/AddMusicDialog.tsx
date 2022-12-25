import { Dialog } from '@/components/Dialog';
import { useState } from 'react';
import { Text } from '@/components/Text';
import { AddSpotifyPlaylistForm } from './AddSpotifyPlaylistForm';
import { MusicSource } from '../../types/MusicSource';
import { SourceButton } from './AddMusicDialog.styles';
import { AddYoutubePlaylistForm } from './AddYoutubePlaylistForm';
import spotifyLogo from '../../assets/SpotifyLogo.png';
import youtubeLogo from '../../assets/YoutubeLogoLight.png';

export interface AddMusicDialogProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

export function AddMusicDialog(props: AddMusicDialogProps) {
  const { open, setOpen } = props;

  const [selectedSource, setSelectedSource] = useState<MusicSource>();

  const handleDialogStateChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setSelectedSource(undefined);
    }
  };

  return (
    <Dialog
      open={open}
      setOpen={handleDialogStateChange}
      title={'Add Music'}
      content={
        <>
          {selectedSource === MusicSource.Spotify && (
            <AddSpotifyPlaylistForm
              onCompletion={() => handleDialogStateChange(false)}
            />
          )}
          {selectedSource === MusicSource.Youtube && (
            <AddYoutubePlaylistForm
              onCompletion={() => handleDialogStateChange(false)}
            />
          )}
          {!selectedSource && (
            <>
              <Text>Select your Source</Text>
              <SourceButton
                onClick={() => setSelectedSource(MusicSource.Spotify)}
              >
                <img src={spotifyLogo} alt={'spotify'} />
              </SourceButton>
              <SourceButton
                onClick={() => setSelectedSource(MusicSource.Youtube)}
              >
                <img src={youtubeLogo} alt={'youtube'} />
              </SourceButton>
            </>
          )}
        </>
      }
    />
  );
}
