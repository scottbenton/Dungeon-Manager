import { Text } from '@/components/Text';
import { useReduxDispatch, useReduxSelector } from '@/hooks/reduxHooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createImageViewerListenerThunk } from '../stores/imageSlice';
import {
  ImageLabelContainer,
  ImageViewer,
  ImageViewerContainer,
} from './ImageViewerPage.styles';

export default function ImageViewerPage() {
  const { uid } = useParams<{ uid: string }>();
  const dispatch = useReduxDispatch();

  const item = useReduxSelector((state) => {
    const currentImageId = state.images.currentSelectedImageId;
    if (currentImageId) {
      return state.images.images[currentImageId];
    }
    return undefined;
  });

  useEffect(() => {
    const thunk = createImageViewerListenerThunk(uid || '');
    const unsubscribe = dispatch(thunk);

    return () => {
      unsubscribe();
    };
  }, [uid, dispatch]);

  return (
    <ImageViewerContainer>
      <ImageViewer
        css={item?.url ? { backgroundImage: `url(${item.url})` } : undefined}
      />
      <ImageLabelContainer>
        <Text variant={'h4'} as={'h1'} textColor={'white'}>
          {item ? item.label : 'Waiting for the user to select an image...'}
        </Text>
      </ImageLabelContainer>
    </ImageViewerContainer>
  );
}
