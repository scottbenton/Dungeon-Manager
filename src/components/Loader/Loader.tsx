import clsx from 'clsx';
import { loaderStyles } from './Loader.styles';

export interface LoaderProps {
  className?: string;
}

export function Loader(props: LoaderProps) {
  const { className } = props;

  return <div className={clsx(className, loaderStyles())} />;
}
