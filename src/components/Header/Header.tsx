import DungeonManagerIcon from '@/assets/DungeonManagerIcon.svg';
import { NavLink } from 'react-router-dom';
import ImagesIcon from '@heroicons/react/20/solid/PhotoIcon';
import MusicIcon from '@heroicons/react/20/solid/MusicalNoteIcon';

import { Container, LogoContainer, Navigation, Surface } from './Header.styles';
import { AvatarMenu } from './AvatarMenu';

export function Header(): JSX.Element {
  return (
    <Surface>
      <Container>
        <LogoContainer>
          <img src={DungeonManagerIcon} alt={'Dungeon Manager Logo'} />
          <span>Dungeon Manager</span>
        </LogoContainer>
        <Navigation>
          <NavLink
            to={'/images'}
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            <ImagesIcon />
            Images
          </NavLink>
          <NavLink
            to={'/music'}
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            <MusicIcon />
            Music
          </NavLink>
        </Navigation>
        <AvatarMenu />
      </Container>
    </Surface>
  );
}
