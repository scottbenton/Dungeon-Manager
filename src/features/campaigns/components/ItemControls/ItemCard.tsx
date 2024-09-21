import { IconButton } from '@/components/Button/IconButton';
import { LinkCard } from '@/components/Card';
import { Text } from '@/components/Text';
import { useReduxSelector } from '@/hooks/reduxHooks';
import { useCampaignImage } from '@/hooks/useCampaignImage';
import { paths } from '@/routes';
import { ItemType, ItemTypes } from '@/types/item.type';
import { updateCampaign } from '../../api/updateCampaign';
import clsx from 'clsx';

export interface ItemCardProps {
  campaignId: string;
  itemId: string;
  itemType: ItemTypes;
  item: ItemType;
}

export function ItemCard(props: ItemCardProps) {
  const { campaignId, itemId, itemType, item } = props;
  const hasImage = !!item.imageFilename;
  const imageState = useCampaignImage(
    campaignId,
    item.imageFilename ?? undefined,
  );

  const selectedItem = useReduxSelector(
    (state) => state.campaigns.campaigns[campaignId]?.currentImage,
  );
  const showShareIcons = useReduxSelector(
    (state) =>
      state.campaigns.campaignSettings[campaignId]?.settings
        ?.showSecondaryDisplay ?? false,
  );
  const isCurrentSelected =
    showShareIcons &&
    selectedItem?.itemId === itemId &&
    selectedItem?.source === itemType;

  const setCampaignImage = (settingSelected: boolean) => {
    const imageFilename = item.imageFilename;
    if (!imageFilename && settingSelected) {
      return;
    }

    updateCampaign(campaignId, {
      currentImage:
        settingSelected && imageFilename
          ? {
              filename: imageFilename,
              itemId: itemId,
              source: itemType,
            }
          : null,
    });
  };

  return (
    <div className='relative flex w-full items-stretch'>
      <LinkCard
        to={paths.campaignItem(campaignId, itemType, itemId)}
        padding={false}
        className={clsx(
          'w-full',
          isCurrentSelected
            ? 'shadow-primary-500 border-primary-500 shadow-md'
            : '',
        )}
      >
        {hasImage && !imageState.url && (
          <div className='aspect-video bg-gray-200 dark:bg-gray-600 animate-pulse w-full' />
        )}
        {hasImage && imageState.url && (
          <img
            src={imageState.url}
            alt={item.name}
            className='aspect-video w-full object-cover'
          />
        )}
        {!hasImage && (
          <div
            className={`aspect-video w-full bg-gradient-to-br from-gray-400 to-gray-600`}
          />
        )}

        <div className='p-4'>
          <Text>{item.name}</Text>
        </div>
      </LinkCard>
      {showShareIcons && item.imageFilename && (
        <div className='absolute bottom-3 right-2'>
          <IconButton
            iconName={isCurrentSelected ? 'stop_screen_share' : 'screen_share'}
            size='sm'
            onClick={() => setCampaignImage(!isCurrentSelected)}
          />
        </div>
      )}
    </div>
  );
}
