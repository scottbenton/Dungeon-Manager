import { useReduxSelector } from '@/hooks/reduxHooks';
import { ItemTypes } from '@/types/item.type';
import { useParams } from 'react-router-dom';
import { useCampaignContext } from '../context/CampaignContext';
import { useCampaignImage } from '@/hooks/useCampaignImage';
import { Text } from '@/components/Text';
import { CustomFieldDefinition } from '@/types/campaign.type';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { updateItem } from '../api/items/updateItem';
import { removeItem } from '../api/items/removeItem';
import { ItemImageUploader } from '../components/ItemControls/ItemImageUploader';
import { useState } from 'react';
import { NPCImage } from '../components/ItemControls/NPCImage';
import { OtherImage } from '../components/ItemControls/OtherImage';

export interface CampaignItemPageProps {
  itemType: ItemTypes;
}

export function CampaignItemPage(props: CampaignItemPageProps) {
  const { itemType } = props;
  const { itemId } = useParams<{ itemId: string }>();
  const { campaignId } = useCampaignContext();
  const item = useReduxSelector(
    (state) =>
      state.campaigns.campaignItems[campaignId]?.[itemType]?.items[
        itemId ?? ''
      ],
  );

  const fieldSettings = useReduxSelector(
    (state) =>
      state.campaigns.campaignSettings[campaignId]?.settings?.customFields?.[
        itemType
      ] ?? {},
  );

  const customFields: (CustomFieldDefinition & { id: string })[] =
    Object.entries(fieldSettings)
      .map(([key, field]) => ({
        id: key,
        ...field,
      }))
      .sort((a, b) => a.order - b.order);

  const image = useCampaignImage(campaignId, item?.imageFilename ?? undefined);
  const [isCampaignImageDialogOpen, setIsCampaignImageDialogOpen] =
    useState(false);

  if (!itemId || !item) {
    return null;
  }

  return (
    <>
      {item.imageFilename && (
        <div className={'mt-4'}>
          {itemType === ItemTypes.NPCs ? (
            <NPCImage imageUrl={image.url} />
          ) : (
            <OtherImage imageUrl={image.url} />
          )}
        </div>
      )}

      <div className='flex items-center justify-between mt-4'>
        <Text variant={'h5'}>{item.name}</Text>
        <div className='flex items-center gap-1'>
          <Button
            variant='secondary'
            onClick={() => setIsCampaignImageDialogOpen(true)}
          >
            Upload Image
          </Button>
          <ItemImageUploader
            itemType={itemType}
            itemId={itemId}
            existingImageURL={image.url}
            open={isCampaignImageDialogOpen}
            onClose={() => setIsCampaignImageDialogOpen(false)}
          />
          <Button
            variant='secondary'
            color='error'
            onClick={() =>
              removeItem(campaignId, itemType, itemId).catch((e) =>
                console.error(e),
              )
            }
          >
            Delete NPC
          </Button>
        </div>
      </div>

      <div className={'grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'}>
        <Input
          label={'Name'}
          defaultValue={item.name}
          onBlur={(evt) =>
            updateItem(campaignId, itemId, itemType, {
              name: evt.currentTarget.value,
            }).catch((e) => console.error(e))
          }
        />
        <div />
        {customFields.map((field) => (
          <Input
            key={field.id}
            label={field.label}
            defaultValue={item.customFieldValues[field.id] ?? ''}
            onBlur={(evt) =>
              updateItem(campaignId, itemId, itemType, {
                [`customFieldValues.${field.id}`]: evt.currentTarget.value,
              }).catch((e) => console.error(e))
            }
          />
        ))}
      </div>
    </>
  );
}
