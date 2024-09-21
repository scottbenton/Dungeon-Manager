import { headerStyles } from './Header.styles';
import { AvatarMenu } from './AvatarMenu';

export function Header(): JSX.Element {
  const { surface, container, appName } = headerStyles();

  return (
    <header className={surface()}>
      <div className={container()}>
        <span className={appName()}>Dungeon Manager</span>
        <AvatarMenu />
      </div>
    </header>
  );
}
