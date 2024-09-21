import { Layout } from '@/components/Layout';
import { createRoutesFromElements, Route } from 'react-router-dom';
import { RootRedirect } from './RootRedirect';
import { Page404 } from './Page404';
import LoginPage from '@/features/authentication/routes/LoginPage';
import SignUpPage from '@/features/authentication/routes/SignUpPage';
import { AuthBlocker } from '@/components/AuthBlocker';
import CampaignSelectPage from '@/features/campaigns/routes/CampaignSelectPage';
import CreateCampaignPage from '@/features/campaigns/routes/CreateCampaignPage';
import { App } from '@/App';
import CampaignPageLayout from '@/features/campaigns/routes/CampaignPageLayout';
import { CampaignItemSelectPage } from '@/features/campaigns/routes/CampaignItemSelectPage';
import { ItemTypes } from '@/types/item.type';
import { CampaignItemPage } from '@/features/campaigns/routes/CampaignItemPage';
import { CampaignSettingsPage } from '@/features/campaigns/routes/CampaignSettingsPage';
import { CampaignViewerPage } from '@/features/campaigns/routes/CampaignViewerPage';

export const paths = {
  login: '/login',
  signUp: '/sign-up',
  campaignList: '/campaigns',
  campaignCreate: '/campaigns/create',
  campaign: (campaignId: string) => `/campaigns/${campaignId}/npcs`,
  campaignNPCs: (campaignId: string) => `/campaigns/${campaignId}/npcs`,
  campaignNPCItem: (campaignId: string, npcId: string) =>
    `/campaigns/${campaignId}/npcs/${npcId}`,
  campaignLocations: (campaignId: string) =>
    `/campaigns/${campaignId}/locations`,
  campaignLocationItem: (campaignId: string, locationId: string) =>
    `/campaigns/${campaignId}/locations/${locationId}`,
  campaignLore: (campaignId: string) => `/campaigns/${campaignId}/lore`,
  campaignLoreItem: (campaignId: string, loreId: string) =>
    `/campaigns/${campaignId}/lore/${loreId}`,
  campaignItem: (campaignId: string, itemType: ItemTypes, itemId: string) => {
    switch (itemType) {
      case ItemTypes.Locations:
        return paths.campaignLocationItem(campaignId, itemId);
      case ItemTypes.NPCs:
        return paths.campaignNPCItem(campaignId, itemId);
      case ItemTypes.Lore:
        return paths.campaignLoreItem(campaignId, itemId);
    }
  },
  campaignSettings: (campaignId: string) => `/campaigns/${campaignId}/settings`,
  campaignSecondScreen: (campaignId: string) =>
    `/campaigns/${campaignId}/viewer`,
};

export const routes = createRoutesFromElements(
  <Route path='/' element={<App />}>
    <Route element={<AuthBlocker requiresAuth />}>
      <Route element={<Layout />}>
        <Route path={'campaigns'}>
          <Route index element={<CampaignSelectPage />} />
          <Route path={'create'} element={<CreateCampaignPage />} />
          <Route path={':campaignId'} element={<CampaignPageLayout />}>
            <Route
              path={'locations'}
              element={
                <CampaignItemSelectPage itemType={ItemTypes.Locations} />
              }
            />
            <Route
              path={'locations/:itemId'}
              element={<CampaignItemPage itemType={ItemTypes.Locations} />}
            />
            <Route
              path={'npcs'}
              element={<CampaignItemSelectPage itemType={ItemTypes.NPCs} />}
            />
            <Route
              path={'npcs/:itemId'}
              element={<CampaignItemPage itemType={ItemTypes.NPCs} />}
            />
            <Route
              path={'lore'}
              element={<CampaignItemSelectPage itemType={ItemTypes.Lore} />}
            />
            <Route
              path={'lore/:itemId'}
              element={<CampaignItemPage itemType={ItemTypes.Lore} />}
            />
            <Route path={'notes'} element={<div>Notes</div>} />
            <Route path={'music'} element={<div>Music</div>} />
            <Route path={'settings'} element={<CampaignSettingsPage />} />
          </Route>
        </Route>
      </Route>
    </Route>
    <Route element={<AuthBlocker requiresAuth={false} />}>
      <Route
        path={'campaigns/:campaignId/viewer'}
        element={<CampaignViewerPage />}
      />
      <Route index element={<RootRedirect />} />
      <Route element={<Layout fullscreen direction='row' />}>
        <Route path={'login'} element={<LoginPage />} />
        <Route path={'sign-up'} element={<SignUpPage />} />
      </Route>
      <Route
        path='*'
        element={
          <Layout>
            <Page404 />
          </Layout>
        }
      />
    </Route>
  </Route>,
);
