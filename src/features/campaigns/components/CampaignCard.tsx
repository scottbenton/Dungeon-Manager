import { Card, LinkCard } from '@/components/Card';
import { Text } from '@/components/Text';
import { useCampaignImage } from '@/hooks/useCampaignImage';
import { stringToHue } from '@/lib/hueHelper';
import { paths } from '@/routes';
import { CampaignType } from '@/types/campaign.type';
import { CSSProperties } from 'react';

export interface CampaignCardProps {
  id: string;
  campaign: CampaignType;
}

export function CampaignCard(props: CampaignCardProps) {
  const { id, campaign } = props;

  const hasImage = !!campaign.campaignImageFilename;
  const imageState = useCampaignImage(
    id,
    campaign.campaignImageFilename ?? undefined,
  );

  const hue1 = stringToHue(id);
  const hue2 = hue1 + 30;

  return (
    <LinkCard to={paths.campaign(id)} padding={false}>
      {hasImage && !imageState.url && (
        <div className='aspect-video bg-gray-200 dark:bg-gray-600 animate-pulse w-full' />
      )}
      {hasImage && imageState.url && (
        <img
          src={imageState.url}
          alt={campaign.name}
          className='aspect-video w-full object-cover'
        />
      )}
      {!hasImage && (
        <div
          className={`aspect-video w-full bg-gradient-to-br`}
          style={
            {
              '--tw-gradient-from': `hsl(${hue1},40%,30%)`,
              '--tw-gradient-to': `hsl(${hue2},40%,20%)`,
              '--tw-gradient-stops':
                'var(--tw-gradient-from), var(--tw-gradient-to)',
            } as CSSProperties
          }
        />
      )}
      <Text variant={'h5'} as={'h2'} className={'p-4'}>
        {campaign.name}
      </Text>
    </LinkCard>
  );
}
