import { Logger } from '@/lib/logger';
import { PropsWithChildren } from 'react';
import { ErrorBoundary as EB } from 'react-error-boundary';
import { ErrorBoundaryPage } from './ErrorBoundaryPage';

export function ErrorBoundary(props: PropsWithChildren): JSX.Element {
  const { children } = props;

  const handleError = (err: Error) => {
    console.error(err);
    Logger.error('error-boundary', {
      name: err.name,
      message: err.message,
    });
  };

  return (
    <EB
      FallbackComponent={ErrorBoundaryPage}
      onReset={() => window.location.reload()}
      onError={handleError}
    >
      {children}
    </EB>
  );
}
