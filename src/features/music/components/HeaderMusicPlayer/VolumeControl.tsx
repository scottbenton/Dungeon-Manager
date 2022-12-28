import { MaterialIcon } from '@/components/Icon';
import { ChangeEvent, MutableRefObject, useEffect, useState } from 'react';
import {
  VolumeControlContainer,
  VolumeControlInput,
} from './VolumeControl.styles';

export interface VolumeControlProps {
  spotifyPlayerRef: MutableRefObject<Spotify.Player | undefined>;
}

export function VolumeControl(props: VolumeControlProps): JSX.Element {
  const { spotifyPlayerRef } = props;

  const [volumeLevel, setVolumeLevel] = useState<number>(1);

  useEffect(() => {
    if (spotifyPlayerRef.current) {
      spotifyPlayerRef.current
        .getVolume()
        .then((volume) => setVolumeLevel(volume));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVolumeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(evt.currentTarget.value);
    if (spotifyPlayerRef.current) {
      setVolumeLevel(volume);
      spotifyPlayerRef.current.setVolume(volume);
    }
  };

  const getVolumeIconName = (): string => {
    if (volumeLevel === 0) {
      return 'volume_mute';
    }
    if (volumeLevel < 0.5) {
      return 'volume_down';
    }
    return 'volume_up';
  };

  return (
    <VolumeControlContainer>
      <MaterialIcon name={getVolumeIconName()} css={{ marginRight: '$s-2' }} />
      <VolumeControlInput
        id={'volume-input'}
        type={'range'}
        min={0}
        max={1}
        step={0.01}
        value={volumeLevel}
        onChange={handleVolumeChange}
      />
    </VolumeControlContainer>
  );
}
