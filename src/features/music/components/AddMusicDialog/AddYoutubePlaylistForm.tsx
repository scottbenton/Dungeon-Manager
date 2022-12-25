import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useReduxSelector } from '@/hooks/reduxHooks';
import { FormButtonContainer, StyledForm } from './AddMusicDialog.styles';
import { addMusicItem } from '../../api/addMusicItem';
import { MusicSource } from '../../types/MusicSource';
import { YoutubeMusicDocument } from '../../types/YoutubeMusicDocument';
import { parseYoutubeURL } from '../../utils/parseYoutubeURL';

export interface AddYoutubePlaylistFormProps {
  onCompletion: () => void;
}

const youtubeSchema = yup.object({
  label: yup.string().required(),
  url: yup.string().url().required(),
});

export interface YoutubeFormData {
  label: string;
  url: string;
}

export function AddYoutubePlaylistForm(props: AddYoutubePlaylistFormProps) {
  const { onCompletion } = props;

  const uid = useReduxSelector((state) => state.auth.user?.id || '');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<YoutubeFormData>({
    resolver: yupResolver(youtubeSchema),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{
    title: string;
    message: string;
  }>();

  const handleFormSubmit = handleSubmit((data) => {
    setLoading(true);
    setErrorMessage(undefined);

    const { label, url } = data;
    const parsedUrl = parseYoutubeURL(url);
    if (parsedUrl) {
      addMusicItem<YoutubeMusicDocument>(uid, MusicSource.Youtube, {
        id: parsedUrl.id,
        label: label,
        type: parsedUrl.type,
        source: MusicSource.Youtube,
        tags: [],
      })
        .then(() => {
          onCompletion();
        })
        .catch((e) => {
          setErrorMessage({
            title: 'Error Adding Document',
            message:
              'There was an error adding your document. Please try again later.',
          });
        })
        .finally(() => {
          setLoading(false);
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
        label={'Label'}
        {...register('label')}
        error={errors.label?.message}
      />
      <Input
        label={'Youtube URL'}
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
