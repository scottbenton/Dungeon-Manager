import { FallbackProps } from 'react-error-boundary';
import { ErrorPage } from '../ErrorPage';

export function ErrorBoundaryPage(props: FallbackProps) {
  const { resetErrorBoundary } = props;

  return (
    <ErrorPage
      title={'Natural 1'}
      message={
        'Dungeon Manager encountered an error and could not recover. Please click the reload button to refresh the page and try again.'
      }
      buttonProps={{
        variant: 'primary',
        color: 'primary',
        endIcon: 'refresh',
        onClick: () => resetErrorBoundary(),
        children: 'Reload Page',
      }}
      fullscreen
    />
  );
}
