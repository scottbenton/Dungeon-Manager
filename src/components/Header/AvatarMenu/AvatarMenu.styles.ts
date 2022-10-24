import { darkTheme, styled } from '@/config/theme';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

export const AvatarButton = styled(DropdownMenuTrigger, {
  borderRadius: '$full',
  borderWidth: '$2',
  borderColor: 'transparent',
  '&:hover': {
    backgroundColor: '$brand-400',
    [`.${darkTheme} &`]: {
      backgroundColor: '$brand-800',
    },
  },
  '&:focus': {
    outline: 'none',
    borderColor: '$border-brand',
  },
});

export const MenuContent = styled(DropdownMenuContent, {
  borderRadius: '$xl',
  backgroundColor: '$surface-foreground',
  paddingY: '$s-2',
  borderWidth: '$1',
  marginRight: '$s-3',
});

// flex items-center w-full p-2 text-sm text-gray-100 dark:text-gray-600 hover:bg-smoke-lightest
export const MenuItem = styled(DropdownMenuItem, {
  padding: '$s-2',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  fontSize: '$text-sm',
  color: '$text-gray-secondary',
  cursor: 'pointer',

  '&:focus': {
    outline: 'none',
    backgroundColor: '$surface-background',
  },
  '&>svg': {
    width: '$s-5',
    color: '$text-gray-tertiary',
    marginRight: '$s-2',
  },
});
