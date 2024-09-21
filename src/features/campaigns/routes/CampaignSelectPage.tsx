import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { useReduxSelector } from '@/hooks/reduxHooks';
import { CampaignCard } from '../components/CampaignCard';
import { paths } from '@/routes';

export default function CampaignSelectPage() {
  const campaigns = useReduxSelector((state) => state.campaigns.campaigns);

  const sortedCampaigns = Object.entries(campaigns).sort((a, b) => {
    return a[1].name.localeCompare(b[1].name);
  });

  return (
    <>
      <div
        className={
          'flex items-center justify-between pb-4 border-b border-gray-300 dark:border-gray-700'
        }
      >
        <Text variant={'h4'} as={'h1'}>
          Your Campaigns
        </Text>
        <Button href={paths.campaignCreate} variant='primary' color='primary'>
          Create Campaign
        </Button>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
        {sortedCampaigns.map(([id, campaign]) => (
          <CampaignCard key={id} id={id} campaign={campaign} />
        ))}
      </div>
    </>
  );
}
