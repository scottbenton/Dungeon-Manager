import DungeonManagerIcon from '@/assets/DungeonManagerIcon.svg';
import { NavLink } from 'react-router-dom';

import { Container, LogoContainer, Navigation, Surface } from './Header.styles';
import { AvatarMenu } from './AvatarMenu';
import { MaterialIcon } from '../Icon';

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
            <MaterialIcon
              name={'image'}
              filled={false}
              css={{ marginRight: '$s-2' }}
            />
            <span className={'label'}>Images</span>
          </NavLink>
          <NavLink
            to={'/music'}
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            <MaterialIcon
              name={'music_note'}
              filled={false}
              css={{ marginRight: '$s-2' }}
            />
            <span className={'label'}>Music</span>
          </NavLink>
        </Navigation>
        <AvatarMenu />
      </Container>
    </Surface>
  );
}
