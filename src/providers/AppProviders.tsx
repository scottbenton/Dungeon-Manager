import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/stores/store';
import { routes } from '@/routes';

const router = createBrowserRouter(routes);

export function AppProviders() {
  return (
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  );
}
