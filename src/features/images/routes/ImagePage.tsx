import { EmptyState } from '@/components/EmptyState';
import { FileDropzone } from '@/components/FileDropzone';
import { Text } from '@/components/Text';
import { createImageListener } from '@/features/images/stores/imageSlice';
import { useReduxDispatch, useReduxSelector } from '@/hooks/reduxHooks';
import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Icon } from '@/components/Icon';
import { constructImageViewerPath } from '@/config/routes';
import { Link } from 'react-router-dom';
import { createImageItem } from '../api/createImageItem';
import { ImageList } from '../components/ImageList';
import { ViewerLinkContainer } from './ImagePage.styles';

export default function ImagePage() {
  const uid = useReduxSelector((state) => state.auth.user?.id);
  const dispatch = useReduxDispatch();

  const { imageOrder, isLoading, selectedImageId } = useReduxSelector(
    (state) => ({
      imageOrder: state.images.imageOrderArray || [],
      isLoading: state.images.isLoading,
      selectedImageId: state.images.currentSelectedImageId,
    })
  );

  useEffect(() => {
    let unsubscribe: () => void;

    if (uid) {
      unsubscribe = dispatch(createImageListener);
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [uid, dispatch]);

  const handleFileUpload = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      if (uid) {
        createImageItem(uid, file);
      }
    });
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileUpload,
  });

  return (
    <>
      <Text variant={'pageTitle'} as={'h1'}>
        Image Sharing
      </Text>
      <Text as={'p'} textColor={'textSecondary'} css={{ marginY: '$s-4' }}>
        Upload images here to share them with your group. Click an image to set
        it as active. <br />
        Best used with an extra screen to share character art & scenery with
        your players.
      </Text>
      <ViewerLinkContainer>
        <Link to={constructImageViewerPath(uid || '')} target={'_blank'}>
          Go to Viewer
          <Icon name={'open-outline'} />
        </Link>
      </ViewerLinkContainer>
      <FileDropzone
        label={'Add Character or Scene Art'}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        isDragActive={isDragActive}
        css={{ marginTop: '$s-8' }}
      />
      {isLoading ? (
        <></>
      ) : imageOrder.length === 0 ? (
        <EmptyState
          message={'Upload an image to get started'}
          IconEntry={'people-circle-outline'}
        />
      ) : (
        <ImageList imageOrder={imageOrder} selectedImageId={selectedImageId} />
      )}
    </>
  );
}
