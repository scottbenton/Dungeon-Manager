import { Text } from '@/components/Text';
import { useReduxDispatch, useReduxSelector } from '@/hooks/reduxHooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { globalCss } from '@/config/theme';
import { createImageViewerListenerThunk } from '../stores/imageSlice';
import {
  ImageLabelContainer,
  ImageViewer,
  ImageViewerContainer,
} from './ImageViewerPageObs.styles';

const globalStyles = globalCss({
  'div#root > div': {
    backgroundColor: 'transparent!important',
  },
});

export default function ImageViewerPage() {
  globalStyles();
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

  if (!item) {
    return <></>;
  }

  return (
    <ImageViewerContainer>
      <ImageViewer css={{ backgroundImage: `url(${item?.url})` }} />
      <ImageLabelContainer>
        <Text variant={'h4'} as={'h1'} textColor={'white'} textAlign={'center'}>
          {item?.label}
        </Text>
      </ImageLabelContainer>
    </ImageViewerContainer>
  );
}
