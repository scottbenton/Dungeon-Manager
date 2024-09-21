import { Button } from '@/components/Button';
import { ItemType, ItemTypes } from '@/types/item.type';
import { useState } from 'react';
import { createItem } from '../api/items/createItem';
import { useReduxSelector } from '@/hooks/reduxHooks';
import { ItemCard } from '../components/ItemControls/ItemCard';
import { useCampaignContext } from '../context/CampaignContext';

export interface CampaignItemPageProps {
  itemType: ItemTypes;
}

const labels: Record<ItemTypes, { singular: string; plural: string }> = {
  [ItemTypes.NPCs]: { singular: 'NPC', plural: 'NPCs' },
  [ItemTypes.Locations]: { singular: 'Location', plural: 'Locations' },
  [ItemTypes.Lore]: { singular: 'Lore', plural: 'Lore' },
};

export function CampaignItemSelectPage(props: CampaignItemPageProps) {
  const { itemType } = props;

  const { campaignId } = useCampaignContext();
  const fieldConfig = useReduxSelector(
    (state) =>
      state.campaigns.campaignSettings[campaignId]?.settings?.customFields?.[
        itemType
      ] ?? {},
  );

  const itemState = useReduxSelector(
    (state) =>
      state.campaigns.campaignItems[campaignId]?.[itemType] ?? {
        isLoading: true,
        items: {},
      },
  );
  const items = Object.entries(itemState.items);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleCreateItem = () => {
    setIsLoading(true);
    const item: ItemType = {
      name: `New ${labels[itemType].singular}`,
      imageFilename: null,
      customFieldValues: {},
    };

    Object.entries(fieldConfig ?? {}).forEach(([fieldKey, field]) => {
      // Name is a protected field
      if (fieldKey === '_name') {
        return;
      }

      if (field.type === 'text') {
        if (field.defaultValue) {
          item.customFieldValues[fieldKey] = field.defaultValue;
        }
      }
    });

    // Handle Create Item
    console.debug(item);
    createItem(campaignId, itemType, item)
      .then((itemId) => {
        console.debug('Created Item', itemId);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div className={'flex items-center justify-between mt-4'}>
        <label className='rounded-xl bg-gray-100 text-gray-700 border overflow-hidden focus-within:border-primary-500'>
          <span className={'sr-only'}>Search {labels[itemType].plural}</span>
          <input
            placeholder={`Search ${labels[itemType].plural}`}
            className='bg-transparent px-4 py-2 focus:outline-none'
          />
        </label>
        <Button
          color='primary'
          variant='primary'
          endIcon='add'
          onClick={() => handleCreateItem()}
          loading={isLoading}
        >
          Create {labels[itemType].singular}
        </Button>
      </div>
      <div
        className='grid gap-2 mt-6'
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        }}
      >
        {items.map(([id, item]) => (
          <ItemCard
            key={id}
            item={item}
            itemId={id}
            itemType={itemType}
            campaignId={campaignId}
          />
        ))}
      </div>
    </div>
  );
}
