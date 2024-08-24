import { pageStyles } from '../Layout/Layout.styles';
import { errorPageStyles } from './ErrorPage.styles';
import { Button, ButtonProps } from '../Button';
import { MaterialIcon } from '../Icon';
import clsx from 'clsx';

export interface ErrorPageProps {
  title: string;
  message: string;
  buttonProps?: ButtonProps;
  fullscreen?: boolean;
}

export function ErrorPage(props: ErrorPageProps): JSX.Element {
  const { title, message, buttonProps, fullscreen } = props;

  const {
    container,
    title: titleClass,
    message: messageClass,
    callToAction,
    icon,
  } = errorPageStyles();
  return (
    <div
      className={pageStyles({
        centerContent: true,
        fullscreen: true,
      }).pageContent()}
    >
      <div className={container()}>
        <div className={titleClass()}>
          <MaterialIcon name={'error'} size={'xl'} className={icon()} />
          {title}
        </div>
        <p className={messageClass()}>{message}</p>
        {buttonProps && (
          <Button
            {...buttonProps}
            className={clsx(buttonProps?.className, callToAction())}
          />
        )}
      </div>
    </div>
  );
}
