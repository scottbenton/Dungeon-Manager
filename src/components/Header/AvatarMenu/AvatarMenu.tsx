import { CurrentUserAvatar } from '@/components/Avatar/CurrentUserAvatar';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import ThemeIcon from '@heroicons/react/20/solid/SunIcon';
import LogoutIcon from '@heroicons/react/20/solid/ArrowLeftOnRectangleIcon';
import { signOut } from '@/features/authentication/api/authApiCalls';
import { useReduxDispatch } from '@/hooks/reduxHooks';
import { toggleTheme } from '@/stores/settingsSlice';

import { AvatarButton, MenuContent, MenuItem } from './AvatarMenu.styles';

export function AvatarMenu(): JSX.Element {
  const dispatch = useReduxDispatch();

  return (
    <DropdownMenu>
      <AvatarButton>
        <CurrentUserAvatar />
      </AvatarButton>
      <MenuContent>
        <MenuItem onSelect={() => dispatch(toggleTheme())}>
          <ThemeIcon />
          Change Theme
        </MenuItem>
        <MenuItem onSelect={() => signOut()}>
          <LogoutIcon />
          Logout
        </MenuItem>
      </MenuContent>
    </DropdownMenu>
  );
}
