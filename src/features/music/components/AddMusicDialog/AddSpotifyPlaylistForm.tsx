import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useReduxSelector } from '@/hooks/reduxHooks';
import { addMusicItem } from '../../api/addMusicItem';
import { MusicSource } from '../../types/MusicSource';
import { SpotifyMusicDocument } from '../../types/SpotifyMusicDocument';
import { parseSpotifyURL } from '../../utils/parseSpotifyURL';
import { FormButtonContainer, StyledForm } from './AddMusicDialog.styles';

export interface AddSpotifyPlaylistFormProps {
  onCompletion: () => void;
}

const spotifySchema = yup.object({
  url: yup.string().url().required(),
});

interface SpotifyFormData {
  url: string;
}

export function AddSpotifyPlaylistForm(props: AddSpotifyPlaylistFormProps) {
  const { onCompletion } = props;
  const uid = useReduxSelector((state) => state.auth.user?.id || '');

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{
    title: string;
    message: string;
  }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SpotifyFormData>({
    resolver: yupResolver(spotifySchema),
  });

  const handleFormSubmit = handleSubmit((data) => {
    setLoading(true);
    setErrorMessage(undefined);
    const { url } = data;

    const parsedUrl = parseSpotifyURL(url);

    if (parsedUrl) {
      addMusicItem<SpotifyMusicDocument>(uid, MusicSource.Spotify, {
        id: parsedUrl.id,
        type: parsedUrl.type,
        source: MusicSource.Spotify,
        tags: [],
      })
        .then(() => {
          onCompletion();
        })
        .catch(() => {
          setErrorMessage({
            title: 'Error Adding Document',
            message:
              'There was an error adding your document. Please try again later.',
          });
        });
    } else {
      setErrorMessage({
        title: 'Invalid URL',
        message: 'We could not parse a video or a playlist from your url.',
      });
    }
  });

  return (
    <StyledForm onSubmit={handleFormSubmit}>
      {errorMessage && (
        <Alert
          variant={'error'}
          title={errorMessage.title}
          message={errorMessage.message}
        />
      )}
      <Input
        label={'Spotify URL'}
        {...register('url')}
        error={errors.url?.message}
      />
      <FormButtonContainer>
        <Button
          variant={'primary'}
          color={'brand'}
          type={'submit'}
          loading={loading}
          endIcon={'add'}
        >
          Add Music
        </Button>
      </FormButtonContainer>
    </StyledForm>
  );
}
