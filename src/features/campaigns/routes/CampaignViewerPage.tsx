import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadCampaign } from '../api/loadCampaign';
import { CampaignType } from '@/types/campaign.type';
import { loadItems } from '../api/items/loadItems';
import { createCampaignItemListener } from '../stores/campaignSlice';
import { useReduxDispatch, useReduxSelector } from '@/hooks/reduxHooks';
import { useCampaignImage } from '@/hooks/useCampaignImage';
import { ItemTypes } from '@/types/item.type';

export function CampaignViewerPage() {
  const campaignId = useParams<{ campaignId: string }>().campaignId;

  const dispatch = useReduxDispatch();

  const [campaign, setCampaign] = useState<CampaignType | null>(null);

  const { currentImage, campaignImageFilename, name } = campaign ?? {};

  useEffect(() => {
    // Load Campaign Data
    let unsubscribes: ((() => void) | undefined)[] = [];

    if (campaignId) {
      unsubscribes.push(loadCampaign(campaignId, setCampaign, (error) => {}));
      unsubscribes.push(createCampaignItemListener(campaignId, dispatch));
    }
    return () => {
      unsubscribes.forEach((unsubscribe) => {
        unsubscribe?.();
      });
    };
  }, [campaignId, dispatch]);

  const campaignImage = useCampaignImage(
    campaignId,
    campaignImageFilename ?? undefined,
  );
  const currentItemImage = useCampaignImage(campaignId, currentImage?.filename);
  const currentItem = useReduxSelector((store) =>
    currentImage && campaignId
      ? store.campaigns.campaignItems[campaignId]?.[currentImage.source]?.items[
          currentImage.itemId
        ]
      : undefined,
  );
  return (
    <div className='bg-gray-950 text-white h-lvh w-full'>
      {!currentImage && (
        <div className='flex items-center justify-center w-full h-full relative'>
          <span className='text-white font-title font-black text-8xl relative z-10'>
            {name}
          </span>
          <div
            className={
              'absolute inset-0 brightness-50 blur-sm bg-center bg-cover'
            }
          >
            <img
              src={campaignImage.url}
              className={
                'flex-shrink-0 w-full h-full rounded-md object-cover object-center'
              }
            />
          </div>
        </div>
      )}
      {currentImage && (
        <>
          {currentImage.source === ItemTypes.NPCs ? (
            <div className='h-full flex flex-col items-center justify-between overflow-hidden p-2'>
              <div className='min-h-0'>
                <img
                  src={currentItemImage.url}
                  className='rounded-2xl overflow-hidden object-contain h-full w-auto mx-auto'
                />
              </div>
              <div className='py-2'>
                <span className='text-5xl font-title font-black py-2'>
                  {currentItem?.name}
                </span>
              </div>
            </div>
          ) : (
            <div className='h-full overflow-hidden p-2 relative'>
              <img
                src={currentItemImage.url}
                className='object-cover rounded-2xl h-full w-full mx-auto'
              />
              <div className='absolute bottom-8 left-1/2 -translate-x-1/2 bg-gray-950 rounded-2xl px-4 py-2'>
                <span className='text-5xl font-title font-black py-2'>
                  {currentItem?.name}
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
