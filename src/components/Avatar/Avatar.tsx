import { MaterialIcon } from '../Icon';
import { avatarStyles } from './Avatar.styles';
import { Root, Fallback } from '@radix-ui/react-avatar';

export interface AvatarProps {
  initials?: string;
}

export function Avatar(props: AvatarProps): JSX.Element {
  const { initials } = props;

  const { base, fallback, fallbackSvg } = avatarStyles();

  return (
    <Root className={base()}>
      {initials || (
        <Fallback className={fallback()} delayMs={600}>
          <MaterialIcon name={'person'} className={fallbackSvg()} />
        </Fallback>
      )}
    </Root>
  );
}
