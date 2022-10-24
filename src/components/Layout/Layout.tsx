import { darkTheme } from '@/config/theme';
import { useReduxSelector } from '@/hooks/reduxHooks';
import { THEMES } from '@/stores/SettingsState';
import { PropsWithChildren } from 'react';
import { VariantProps } from '@stitches/react';

import { Header } from '../Header';
import { Page, PageContent } from './Layout.styles';
import { ErrorBoundary } from '../ErrorBoundary';

export type LayoutProps = VariantProps<typeof PageContent> & PropsWithChildren;

export function Layout(props: LayoutProps): JSX.Element {
  const { children, ...layoutProps } = props;
  const { fullscreen } = layoutProps;

  const themeKey = useReduxSelector((state) => state.settings.theme);

  return (
    <Page
      className={themeKey === THEMES.DARK ? darkTheme.className : undefined}
    >
      <ErrorBoundary>
        {!fullscreen && <Header />}
        <PageContent {...layoutProps}>{children}</PageContent>
      </ErrorBoundary>
    </Page>
  );
}
Layout.defaultProps = {
  fullscreen: false,
  centerContent: false,
};
