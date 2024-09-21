import { Checkbox } from '@/components/Checkbox';
import { Text } from '@/components/Text';
import { useReduxSelector } from '@/hooks/reduxHooks';
import { useCampaignContext } from '../context/CampaignContext';
import { useEffect, useState } from 'react';
import { updateCampaignSettings } from '../api/settings/updateItem';

export function CampaignSettingsPage() {
  const { campaignId } = useCampaignContext();
  const settings = useReduxSelector(
    (state) => state.campaigns.campaignSettings[campaignId]?.settings,
  );
  const initialIsUsingSecondScreen = settings?.showSecondaryDisplay ?? false;
  const [isUsingSecondScreen, setIsUsingSecondScreen] = useState(
    initialIsUsingSecondScreen,
  );

  useEffect(() => {
    setIsUsingSecondScreen(initialIsUsingSecondScreen);
  }, [initialIsUsingSecondScreen]);

  return (
    <div className='mt-2'>
      <Text as='h1' variant={'h5'} textColor='textSecondary'>
        Campaign Settings
      </Text>
      <Checkbox
        id='hasSecondScreen'
        label='Include controls for sharing NPC, Location, and Lore images on a secondary display'
        className={'mt-4'}
        checked={isUsingSecondScreen}
        onCheckedChange={(checked) =>
          updateCampaignSettings(campaignId, {
            showSecondaryDisplay: checked === true ? true : false,
          })
        }
      />
    </div>
  );
}
