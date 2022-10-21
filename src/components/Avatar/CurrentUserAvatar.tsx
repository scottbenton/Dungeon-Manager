import { useReduxSelector } from '@/hooks/reduxHooks';
import { Avatar } from './Avatar';
import { getInitials } from './getInitials';

export function CurrentUserAvatar(): JSX.Element {
  const displayName = useReduxSelector((state) => state.auth.user?.displayName);
  const initials = getInitials(displayName);

  return <Avatar initials={initials} />;
}
