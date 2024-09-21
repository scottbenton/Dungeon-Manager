import { Text } from '@/components/Text';
import { useReduxSelector } from '@/hooks/reduxHooks';
import { useCampaignImage } from '@/hooks/useCampaignImage';
import { paths } from '@/routes';
import { CampaignType } from '@/types/campaign.type';
import { ItemTypes } from '@/types/item.type';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

export interface SidebarProps {
  campaign: CampaignType;
  campaignId: string;
}
export function Sidebar(props: SidebarProps) {
  const { campaignId, campaign } = props;

  const currentImage = campaign.currentImage;

  const campaignImage = useCampaignImage(
    campaignId,
    campaign.campaignImageFilename ?? undefined,
  );
  const currentItemImage = useCampaignImage(campaignId, currentImage?.filename);
  const currentItem = useReduxSelector((store) =>
    currentImage
      ? store.campaigns.campaignItems[campaignId]?.[currentImage.source]?.items[
          currentImage.itemId
        ]
      : undefined,
  );

  return (
    <div className='flex flex-col p-3 rounded-xl bg-gray-200 dark:bg-gray-900 border dark:border-gray-700 min-w-80 md:w-80'>
      <Text variant={'overline'}>Secondary Display View</Text>
      <div
        className={
          'bg-gray-950 w-full aspect-video overflow-hidden rounded-md mt-1'
        }
      >
        {!currentImage && (
          <div className='flex items-center justify-center w-full h-full relative'>
            <span className='text-white font-title font-black text-2xl relative z-10'>
              {campaign.name}
            </span>
            <div
              className={'absolute inset-0 blur-sm bg-center bg-cover'}
              style={{ backgroundImage: `url(${campaignImage.url})` }}
            >
              <div className='blur-sm w-full h-full bg-gray-950/25' />
            </div>
          </div>
        )}
        {currentImage && (
          <>
            {currentImage.source === ItemTypes.NPCs ? (
              <div className='w-full h-full flex flex-col items-center max-h-full p-2 overflow-hidden'>
                <img
                  src={currentItemImage.url}
                  className={
                    'flex-shrink-0 max-h-full rounded-md object-contain'
                  }
                  style={{ maxHeight: 'calc(100% - 1rem)' }}
                />
                <span className='flex-grow text-white font-title font-black'>
                  {currentItem?.name ?? ''}
                </span>
              </div>
            ) : (
              <div className='w-full h-full p-1 overflow-hidden relative'>
                <img
                  src={currentItemImage.url}
                  className={
                    'flex-shrink-0 w-full h-full rounded-sm object-cover'
                  }
                />
                <span className='flex-grow text-white font-title font-black rounded-md bg-gray-950 absolute left-1/2 bottom-2 -translate-x-1/2 px-1'>
                  {currentItem?.name ?? ''}
                </span>
              </div>
            )}
          </>
        )}
      </div>
      <Link
        to={paths.campaignSecondScreen(campaignId)}
        target='_blank'
        className='mt-1 hover:underline'
      >
        Open Secondary Screen Link
      </Link>
    </div>
  );
}
