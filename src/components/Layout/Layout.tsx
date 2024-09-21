import { useReduxSelector } from '@/hooks/reduxHooks';
import { THEMES } from '@/stores/SettingsState';
import { PropsWithChildren } from 'react';

import { Header } from '../Header';
import { pageStyles } from './Layout.styles';
import { ErrorBoundary } from '../ErrorBoundary';
import clsx from 'clsx';
import { VariantProps } from 'tailwind-variants';
import { Outlet } from 'react-router-dom';

export type LayoutProps = VariantProps<typeof pageStyles> & PropsWithChildren;

export function Layout(props: LayoutProps): JSX.Element {
  const { children, ...variants } = props;
  const { fullscreen } = variants;
  const { root, page, pageContent } = pageStyles(variants);

  const themeKey = useReduxSelector((state) => state.settings.theme);

  return (
    <div className={clsx(root(), themeKey === THEMES.DARK ? 'dark' : '')}>
      <div className={page()}>
        <ErrorBoundary>
          {!fullscreen && <Header />}
          <div className={pageContent()}>
            <Outlet />
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
}
