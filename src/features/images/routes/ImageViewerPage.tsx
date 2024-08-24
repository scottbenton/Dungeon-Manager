import { Text } from '@/components/Text';
import { useReduxDispatch, useReduxSelector } from '@/hooks/reduxHooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createImageViewerListenerThunk } from '../stores/imageSlice';

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
    <div
      className={'bg-gray-950 flex-grow flex items-stretch justify-center p-4'}
    >
      <div
        className={'flex-grow bg-cover bg-center bg-no-repeat rounded-xl'}
        style={item?.url ? { backgroundImage: `url(${item.url})` } : undefined}
      />
      <div
        className={'absolute bottom-6 mx-auto bg-gray-950 rounded-xl px-6 py-4'}
      >
        <Text
          variant={'h4'}
          as={'h1'}
          textColor={'white'}
          className={'font-title font-black tracking-wide text-4xl'}
        >
          {item ? item.label : 'Waiting for the user to select an image...'}
        </Text>
      </div>
    </div>
  );
}
