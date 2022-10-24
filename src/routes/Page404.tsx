import { ErrorPage } from '@/components/ErrorPage';
import ImagesIcon from '@heroicons/react/20/solid/PhotoIcon';
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
        color: 'brand',
        endIcon: ImagesIcon,
        children: 'Go to Images Page',
        href: routePaths[ROUTES.IMAGES],
      }}
    />
  );
}
