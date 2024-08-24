import { Text } from '@/components/Text';
import { Link } from 'react-router-dom';
import dungeonManagerIconSrc from '@/assets/DungeonManagerIcon.svg';
import { MaterialIcon } from '@/components/Icon';
import PhotoIcon from '../../assets/SharePhoto.svg?react';
import MonitorIcon from '../../assets/Monitor.svg?react';
import MusicIcon from '../../assets/MusicDisc.svg?react';
import { featureStyles } from './AuthPage.styles';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import { Card } from '@/components/Card';

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
    <div
      className={
        'flex flex-grow bg-gradient-to-b from-primary-900 to-primary-700 justify-center items-center lg:items-stretch'
      }
    >
      <div className='flex-grow p-6 hidden lg:flex flex-col'>
        <div className={'flex items-center'}>
          <img
            src={dungeonManagerIconSrc}
            className={'w-10 mr-4'}
            alt={'Dungeon Manager Icon'}
          />
          <Text
            textColor={'white'}
            variant={'h3'}
            className={'font-title font-black'}
          >
            Dungeon Manager
          </Text>
        </div>
        <div className='flex flex-grow flex-col items-start pt-24 pb-48 justify-between'>
          <div className={featureStyles().feature()}>
            <div className={featureStyles().featureIcon()}>
              <PhotoIcon />
            </div>
            <div>
              <Text textColor={'white'} variant={'h5'}>
                Upload Images
              </Text>
              <Text textColor={'white'} variant={'caption'}>
                Upload character and location art to the application to save it.
              </Text>
            </div>
          </div>
          <div className={featureStyles().feature()}>
            <div className={featureStyles().featureIcon()}>
              <MonitorIcon />
            </div>
            <div>
              <Text textColor={'white'} variant={'h5'}>
                Share Images with your Party
              </Text>
              <Text textColor={'white'} variant={'caption'}>
                Select an image to display it on the viewer for your players.
              </Text>
            </div>
          </div>
          <div className={featureStyles().feature()}>
            <div className={featureStyles().featureIcon()}>
              <MusicIcon />
            </div>
            <div>
              <Text textColor={'white'} variant={'h5'}>
                Music Control
              </Text>
              <Text textColor={'white'} variant={'caption'}>
                Connect with Youtube or Spotify (coming soon) to control your
                music.
              </Text>
            </div>
          </div>
        </div>
      </div>
      <Card
        className={'rounded-xl w-full max-w-md lg:rounded-none flex flex-col'}
        // padding={false}
      >
        <div className={'flex items-center'}>
          <div
            className={
              'bg-primary-200 dark:bg-primary-600 rounded-xl flex items-center justify-center p-2 text-primary-700 dark:text-primary-200 mr-2'
            }
          >
            <MaterialIcon size={'md'} name={'account_circle'} />
          </div>
          <Text as={'h1'} variant={'h2'} textColor={'primary'}>
            {title}
          </Text>
        </div>
        <Text variant={'body'} textColor={'textTertiary'} className='mt-4'>
          {message}
        </Text>
        <div className={'mt-8'}>{socialLoginButtons}</div>
        <div className={'flex items-center mt-10'}>
          <hr className={'flex-grow'} />
          <Text as={'span'} variant={'overline'} className={'px-4'}>
            OR
          </Text>
          <hr className={'flex-grow'} />
        </div>
        <div className={'flex-grow mt-10'}>{form}</div>
        <div
          className={'-mx-4 -mb-4 fullWidth mt-10 bg-gray-200 dark:bg-gray-900'}
        >
          <div className={'p-6 flex justify-between max-width-md mx-auto'}>
            <Text textColor={'textSecondary'}>{toggleSignInSignUp.label}</Text>
            <Link
              className={
                'ml-2 text-primary-700 dark:text-primary-200 font-semibold'
              }
              to={toggleSignInSignUp.href}
            >
              {toggleSignInSignUp.linkText}
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
