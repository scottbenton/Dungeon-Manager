import DungeonManagerIcon from '@/assets/DungeonManagerIcon.svg';
import { NavLink } from 'react-router-dom';
import ImagesIcon from '@heroicons/react/20/solid/PhotoIcon';

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
        </Navigation>
        <AvatarMenu />
      </Container>
    </Surface>
  );
}
