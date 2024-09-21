import { useDispatch } from 'react-redux';
import { useReduxSelector } from './reduxHooks';
import { useEffect } from 'react';
import { getDownloadURL } from 'firebase/storage';
import { getStorageRef } from '@/features/campaigns/api/_getRef';
import {
  setImage,
  setImageLoading,
} from '@/features/campaigns/stores/campaignSlice';

export function useCampaignImage(campaignId?: string, imageFilename?: string) {
  const dispatch = useDispatch();

  const existingImageState = useReduxSelector((state) => {
    if (!campaignId || !imageFilename) {
      return undefined;
    }
    return state.campaigns.campaignImages[campaignId]?.[imageFilename];
  });

  useEffect(() => {
    if (!existingImageState && campaignId && imageFilename) {
      dispatch(setImageLoading({ campaignId, imageName: imageFilename }));
      getDownloadURL(getStorageRef(campaignId, imageFilename))
        .then((url) => {
          dispatch(setImage({ campaignId, imageName: imageFilename, url }));
        })
        .catch((e) => {});
    }
  }, [existingImageState, campaignId, imageFilename]);

  return (
    existingImageState ?? {
      loading: true,
      url: undefined,
    }
  );
}
