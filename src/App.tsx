import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useReduxDispatch, useReduxSelector } from './hooks/reduxHooks';
import { createFirebaseUserListener } from './features/authentication/stores/authSlice';
import { createCampaignListener } from './features/campaigns/stores/campaignSlice';

export function App() {
  const dispatch = useReduxDispatch();

  const uid = useReduxSelector((state) => state.auth.user?.id);

  useEffect(() => {
    const unsubscribe = dispatch(createFirebaseUserListener);

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined = undefined;
    if (uid) {
      unsubscribe = createCampaignListener(uid, dispatch);
    }
    return () => {
      unsubscribe?.();
    };
  });

  return <Outlet />;
}
