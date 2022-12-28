import { CurrentUserAvatar } from '@/components/Avatar/CurrentUserAvatar';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { signOut } from '@/features/authentication/api/authApiCalls';
import { useReduxDispatch, useReduxSelector } from '@/hooks/reduxHooks';
import { toggleTheme } from '@/stores/settingsSlice';
import { MaterialIcon } from '@/components/Icon';
import { THEMES } from '@/stores/SettingsState';

import { AvatarButton, MenuContent, MenuItem } from './AvatarMenu.styles';

export function AvatarMenu(): JSX.Element {
  const dispatch = useReduxDispatch();
  const currentTheme = useReduxSelector((store) => store.settings.theme);

  return (
    <DropdownMenu>
      <AvatarButton>
        <CurrentUserAvatar />
      </AvatarButton>
      <MenuContent>
        <MenuItem onSelect={() => dispatch(toggleTheme())}>
          <MaterialIcon
            name={currentTheme === THEMES.LIGHT ? 'dark_mode' : 'light_mode'}
            size={'sm'}
          />
          Change Theme
        </MenuItem>
        <MenuItem onSelect={() => signOut()}>
          <MaterialIcon name={'logout'} size={'sm'} />
          Logout
        </MenuItem>
      </MenuContent>
    </DropdownMenu>
  );
}
