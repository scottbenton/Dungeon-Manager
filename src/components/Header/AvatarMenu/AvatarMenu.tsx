import { CurrentUserAvatar } from '@/components/Avatar/CurrentUserAvatar';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { signOut } from '@/features/authentication/api/authApiCalls';
import { useReduxDispatch, useReduxSelector } from '@/hooks/reduxHooks';
import { toggleTheme } from '@/stores/settingsSlice';
import { Icon } from '@/components/Icon';
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
          <Icon name={currentTheme === THEMES.LIGHT ? 'moon' : 'sunny'} />
          Change Theme
        </MenuItem>
        <MenuItem onSelect={() => signOut()}>
          <Icon name={'log-out-outline'} />
          Logout
        </MenuItem>
      </MenuContent>
    </DropdownMenu>
  );
}
