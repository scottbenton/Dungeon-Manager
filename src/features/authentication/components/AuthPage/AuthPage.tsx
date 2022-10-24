import { Text } from '@/components/Text';
import UserCircleIcon from '@heroicons/react/24/solid/UserCircleIcon';
import { Link } from 'react-router-dom';
import dungeonManagerIconSrc from '@/assets/DungeonManagerIcon.svg';
import { ReactComponent as PhotoIcon } from '../../assets/SharePhoto.svg';
import { ReactComponent as MonitorIcon } from '../../assets/Monitor.svg';
import { ReactComponent as MusicIcon } from '../../assets/MusicDisc.svg';
import {
  CardFormContainer,
  CardHeader,
  DungeonManagerLogo,
  Feature,
  FeatureIcon,
  FeatureInfoSection,
  LoginButtonContainer,
  OrContainer,
  Sidebar,
  StyledAuthPage,
  StyledCard,
  SwitchSignInSignUpContainer,
} from './AuthPage.styles';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';

export interface AuthPageProps {
  title: string;
  message: string;
  form: React.ReactNode;
  socialLoginButtons: React.ReactNode;
  toggleSignInSignUp: {
    label: string;
    href: string;
    linkText: string;
  };
}

export function AuthPage(props: AuthPageProps): JSX.Element {
  const { title, message, form, socialLoginButtons, toggleSignInSignUp } =
    props;

  useAuthRedirect();

  return (
    <StyledAuthPage
      sidebarVisible={{
        '@initial': false,
        '@lg': true,
      }}
    >
      <Sidebar
        isVisible={{
          '@initial': false,
          '@lg': true,
        }}
      >
        <DungeonManagerLogo>
          <img src={dungeonManagerIconSrc} alt={'Dungeon Manager Icon'} />
          <Text
            textColor={'white'}
            variant={'h4'}
            css={{ fontFamily: '$title' }}
          >
            Dungeon Manager
          </Text>
        </DungeonManagerLogo>
        <FeatureInfoSection>
          <Feature>
            <FeatureIcon>
              <PhotoIcon />
            </FeatureIcon>
            <div>
              <Text textColor={'white'} variant={'h5'}>
                Upload Images
              </Text>
              <Text textColor={'white'} variant={'caption'}>
                Upload character and location art to the application to save it.
              </Text>
            </div>
          </Feature>
          <Feature>
            <FeatureIcon>
              <MonitorIcon />
            </FeatureIcon>
            <div>
              <Text textColor={'white'} variant={'h5'}>
                Share Images with your Party
              </Text>
              <Text textColor={'white'} variant={'caption'}>
                Select an image to display it on the viewer for your players.
              </Text>
            </div>
          </Feature>
          <Feature>
            <FeatureIcon>
              <MusicIcon />
            </FeatureIcon>
            <div>
              <Text textColor={'white'} variant={'h5'}>
                Music Control (Coming Soon)
              </Text>
              <Text textColor={'white'} variant={'caption'}>
                Connect with Spotify or Youtube to control music from the
                application.
              </Text>
            </div>
          </Feature>
        </FeatureInfoSection>
      </Sidebar>
      <StyledCard
        rounded={{
          '@initial': true,
          '@lg': false,
        }}
        padding={false}
      >
        <CardHeader>
          <div>
            <UserCircleIcon />
          </div>
          <Text as={'h1'} variant={'h2'} textColor={'brandPrimary'}>
            {title}
          </Text>
        </CardHeader>
        <Text
          variant={'body'}
          textColor={'textTertiary'}
          css={{ marginTop: '$s-4', paddingX: '$s-6' }}
        >
          {message}
        </Text>
        <LoginButtonContainer>{socialLoginButtons}</LoginButtonContainer>
        <OrContainer>
          <hr />
          <Text as={'span'} variant={'overline'}>
            OR
          </Text>
          <hr />
        </OrContainer>
        <CardFormContainer>{form}</CardFormContainer>
        <SwitchSignInSignUpContainer className={'fullWidth'}>
          <div>
            <Text textColor={'textSecondary'}>{toggleSignInSignUp.label}</Text>
            <Link to={toggleSignInSignUp.href}>
              {toggleSignInSignUp.linkText}
            </Link>
          </div>
        </SwitchSignInSignUpContainer>
      </StyledCard>
    </StyledAuthPage>
  );
}
