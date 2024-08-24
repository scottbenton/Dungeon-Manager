import { tv } from 'tailwind-variants';
import './icon.css';

export const iconStyles = tv({
  base: 'mui-icon',
  variants: {
    filled: {
      true: 'filled',
      false: '',
    },
    size: {
      sm: 'size-sm',
      md: 'size-md',
      lg: 'size-lg',
      xl: 'size-xl',
      background: 'size-background',
    },
  },
  defaultVariants: {
    filled: false,
    size: 'md',
  },
});
