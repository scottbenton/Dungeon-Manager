import { CurrentUserAvatar } from '@/components/Avatar/CurrentUserAvatar';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { signOut } from '@/features/authentication/api/authApiCalls';
import { useReduxDispatch, useReduxSelector } from '@/hooks/reduxHooks';
import { toggleTheme } from '@/stores/settingsSlice';
import { MaterialIcon } from '@/components/Icon';
import { THEMES } from '@/stores/SettingsState';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { avatarStyles } from './AvatarMenu.styles';

export function AvatarMenu(): JSX.Element {
  const dispatch = useReduxDispatch();
  const currentTheme = useReduxSelector((store) => store.settings.theme);

  const { avatar, menuContent, menuItem, menuItemIcon } = avatarStyles();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={avatar()}>
        <CurrentUserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={menuContent()}>
        <DropdownMenuItem
          className={menuItem()}
          onSelect={() => dispatch(toggleTheme())}
        >
          <MaterialIcon
            className={menuItemIcon()}
            name={currentTheme === THEMES.LIGHT ? 'dark_mode' : 'light_mode'}
            size={'sm'}
          />
          Change Theme
        </DropdownMenuItem>
        <DropdownMenuItem className={menuItem()} onSelect={() => signOut()}>
          <MaterialIcon
            className={menuItemIcon()}
            name={'logout'}
            size={'sm'}
          />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
