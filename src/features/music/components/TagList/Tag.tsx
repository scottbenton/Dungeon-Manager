import { Icon } from '@/components/Icon';
import { useState } from 'react';
import { getHSL, getHueFromString } from '../../utils/hueHelpers';
import { Tag as StyledTag } from './Tags.styles';

export interface TagProps {
  children: string;
  handleDelete?: () => void;
}

export function Tag(props: TagProps): JSX.Element {
  const { handleDelete, children } = props;

  const hue = getHueFromString(children);

  const [isHovering, setIsHovering] = useState<boolean>(false);

  return (
    <StyledTag
      css={{
        $$darkShade: getHSL(hue, 70, 30),
        $$darkShadeHover: getHSL(hue, 70, 10),
        $$lightShade: getHSL(hue, 80, 95),
        $$lightShadeHover: getHSL(hue, 80, 85),
        $$tertiaryShade: getHSL(hue, 70, 50),
        $$tertiaryShadeHover: getHSL(hue, 70, 40),
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
      {handleDelete && isHovering && (
        <button type={'button'} onClick={() => handleDelete()}>
          <Icon name={'trash'} />
        </button>
      )}
    </StyledTag>
  );
}

Tag.defaultProps = {
  handleDelete: undefined,
};
