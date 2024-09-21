import { ErrorPage } from '@/components/ErrorPage';
import { paths } from '.';

export function Page404(): JSX.Element {
  return (
    <ErrorPage
      title={'Not Found'}
      message={
        "We couldn't find your page. Try navigating back to your campaigns?"
      }
      buttonProps={{
        variant: 'primary',
        color: 'primary',
        endIcon: 'image',
        children: 'Go to your Campaigns',
        href: paths.campaignList,
      }}
    />
  );
}
