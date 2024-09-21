import { EmptyState } from '@/components/EmptyState';
import { Text } from '@/components/Text';
import { useReduxDispatch, useReduxSelector } from '@/hooks/reduxHooks';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {
  createCampaignItemListener,
  createCampaignSettingsListener,
} from '../stores/campaignSlice';
import { paths } from '@/routes';
import { CampaignProvider } from '../context/CampaignContext';
import { Sidebar } from '../components/Sidebar';

export default function CampaignPageLayout() {
  const { campaignId } = useParams<{ campaignId?: string }>();

  const areCampaignsLoading = useReduxSelector(
    (state) => state.campaigns.isLoading,
  );
  const currentCampaign = useReduxSelector((state) =>
    campaignId ? state.campaigns.campaigns?.[campaignId] : undefined,
  );
  const isUsingSecondScreen = useReduxSelector((state) =>
    campaignId
      ? (state.campaigns.campaignSettings[campaignId]?.settings
          ?.showSecondaryDisplay ?? false)
      : false,
  );

  const dispatch = useReduxDispatch();
  useEffect(() => {
    let unsubscribes: ((() => void) | undefined)[] = [];
    if (campaignId) {
      unsubscribes.push(createCampaignItemListener(campaignId, dispatch));
      unsubscribes.push(createCampaignSettingsListener(campaignId, dispatch));
    }
    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe && unsubscribe());
    };
  }, [dispatch, campaignId]);
  const routeSections = useLocation().pathname.split('/').filter(Boolean);

  if (areCampaignsLoading) {
    return null;
  }

  if (!currentCampaign || !campaignId) {
    return (
      <EmptyState
        message={'Campaign not found'}
        IconEntry={'release_alert'}
        callToAction={{
          children: 'Back to Campaigns',
          href: paths.campaignList,
          variant: 'primary',
          color: 'primary',
        }}
      />
    );
  }

  const tabClasses =
    'rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 font-semibold data-[state=active]:bg-primary-200 dark:data-[state=active]:bg-primary-700 data-[state=active]:text-primary-700 dark:data-[state=active]:text-white transition-colors duration-150 ease-in-out';

  return (
    <CampaignProvider campaignId={campaignId} campaign={currentCampaign}>
      <div
        className={'flex items-start flex-col-reverse md:flex-row gap-4 -mt-2'}
      >
        <div className='flex-grow'>
          <div className={'flex items-center space-x-2'}>
            <Link
              className={'underline cursor-pointer'}
              to={paths.campaignList}
            >
              <Text as='span' textColor='textPrimary'>
                Campaigns
              </Text>
            </Link>
            <Text as='span' textColor='textSecondary'>
              /
            </Text>
            <Text textColor='textPrimary'>{currentCampaign.name}</Text>
          </div>
          <nav
            className={
              'mt-2 flex items-center justify-start overflow-y-auto pb-2 border-b dark:border-gray-700'
            }
          >
            <Link
              to={paths.campaignNPCs(campaignId)}
              data-state={
                routeSections.includes('npcs') ? 'active' : 'inactive'
              }
              className={tabClasses}
            >
              NPCs
            </Link>
            <Link
              to={paths.campaignLocations(campaignId)}
              data-state={
                routeSections.includes('locations') ? 'active' : 'inactive'
              }
              className={tabClasses}
            >
              Locations
            </Link>
            <Link
              to={paths.campaignLore(campaignId)}
              data-state={
                routeSections.includes('lore') ? 'active' : 'inactive'
              }
              className={tabClasses}
            >
              Lore
            </Link>
            <Link
              to={paths.campaignSettings(campaignId)}
              data-state={
                routeSections.includes('settings') ? 'active' : 'inactive'
              }
              className={tabClasses}
            >
              Settings
            </Link>
          </nav>
          <Outlet />
        </div>
        {isUsingSecondScreen && (
          <Sidebar campaign={currentCampaign} campaignId={campaignId} />
        )}
      </div>
    </CampaignProvider>
  );
}
