import DungeonManagerIcon from '@/assets/DungeonManagerIcon.svg';
import { NavLink } from 'react-router-dom';

import { Container, LogoContainer, Navigation, Surface } from './Header.styles';
import { AvatarMenu } from './AvatarMenu';
import { Icon } from '../Icon';

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
            <Icon name={'image'} css={{ marginRight: '$s-2' }} />
            Images
          </NavLink>
          <NavLink
            to={'/music'}
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            <Icon name={'musical-notes'} css={{ marginRight: '$s-2' }} />
            Music
          </NavLink>
        </Navigation>
        <AvatarMenu />
      </Container>
    </Surface>
  );
}
