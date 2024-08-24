import DungeonManagerIcon from '@/assets/DungeonManagerIcon.svg';
import { NavLink } from 'react-router-dom';

import { headerStyles } from './Header.styles';
import { AvatarMenu } from './AvatarMenu';
import { MaterialIcon } from '../Icon';
import clsx from 'clsx';

export function Header(): JSX.Element {
  const {
    surface,
    container,
    logoContainer,
    logo,
    appName,
    navigation,
    navLink,
  } = headerStyles();

  return (
    <header className={surface()}>
      <div className={container()}>
        <div className={logoContainer()}>
          <img
            className={logo()}
            src={DungeonManagerIcon}
            alt={'Dungeon Manager Logo'}
          />
          <span className={appName()}>Dungeon Manager</span>
        </div>
        <nav className={navigation()}>
          <NavLink
            to={'/images'}
            className={({ isActive }) =>
              isActive ? clsx('active', navLink()) : navLink()
            }
          >
            <MaterialIcon name={'image'} filled={false} className={'mr-2'} />
            <span className={'label'}>Images</span>
          </NavLink>
          {/* <NavLink
            to={'/music'}
            className={({ isActive }) =>
              isActive ? clsx('active', navLink()) : navLink()
            }
          >
            <MaterialIcon
              name={'music_note'}
              filled={false}
              className={'mr-2'}
            />
            <span className={'label'}>Music</span>
          </NavLink> */}
        </nav>
        <AvatarMenu />
      </div>
    </header>
  );
}
