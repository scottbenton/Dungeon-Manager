import { MaterialIcon } from '../Icon';
import { StyledAvatar, StyledFallback } from './Avatar.styles';

export interface AvatarProps {
  initials?: string;
}

export function Avatar(props: AvatarProps): JSX.Element {
  const { initials } = props;
  return (
    <StyledAvatar>
      {initials || (
        <StyledFallback delayMs={600}>
          <MaterialIcon name={'person'} />
        </StyledFallback>
      )}
    </StyledAvatar>
  );
}

Avatar.defaultProps = {
  initials: undefined,
};
