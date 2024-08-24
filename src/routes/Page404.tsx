import { ErrorPage } from '@/components/ErrorPage';
import { routePaths, ROUTES } from '@/config/routes';

export function Page404(): JSX.Element {
  return (
    <ErrorPage
      title={'Not Found'}
      message={
        "We couldn't find your page. Try navigating back to your images?"
      }
      buttonProps={{
        variant: 'primary',
        color: 'primary',
        endIcon: 'image',
        children: 'Go to Images Page',
        href: routePaths[ROUTES.IMAGES],
      }}
    />
  );
}
