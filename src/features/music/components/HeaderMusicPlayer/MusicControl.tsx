import { Icon } from '@/components/Icon';
import { IconNames } from '@/types/IonIconNames';
import { StyledMusicControl } from './MusicControl.styles';

export interface MusicControlProps {
  label: string;
  iconName: IconNames;
  onClick: () => void;
  disabled?: boolean;
  selected?: boolean;
}

export function MusicControl(props: MusicControlProps): JSX.Element {
  const { label, iconName, onClick, disabled, selected } = props;

  return (
    <StyledMusicControl
      aria-label={label}
      type={'button'}
      disabled={disabled}
      aria-pressed={selected}
      onClick={() => onClick()}
    >
      <Icon name={iconName} />
    </StyledMusicControl>
  );
}

MusicControl.defaultProps = {
  disabled: undefined,
  selected: undefined,
};
