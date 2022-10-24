import { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/stores/store';

export function AppProviders(props: PropsWithChildren) {
  const { children } = props;

  return (
    <ReduxProvider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </ReduxProvider>
  );
}
