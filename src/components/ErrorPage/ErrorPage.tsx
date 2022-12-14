import { PageContent } from '../Layout/Layout.styles';
import {
  ErrorPageMessage,
  ErrorPageTitle,
  ErrorPageContainer,
  CallToAction,
} from './ErrorPage.styles';
import { ButtonProps } from '../Button';
import { Icon } from '../Icon';

export interface ErrorPageProps {
  title: string;
  message: string;
  buttonProps?: ButtonProps;
  fullscreen?: boolean;
}

export function ErrorPage(props: ErrorPageProps): JSX.Element {
  const { title, message, buttonProps, fullscreen } = props;

  return (
    <PageContent centerContent fullscreen={fullscreen}>
      <ErrorPageContainer>
        <ErrorPageTitle>
          <Icon name={'alert-circle'} />
          {title}
        </ErrorPageTitle>
        <ErrorPageMessage>{message}</ErrorPageMessage>
        <CallToAction {...buttonProps} />
      </ErrorPageContainer>
    </PageContent>
  );
}

ErrorPage.defaultProps = {
  buttonProps: undefined,
  fullscreen: false,
};
