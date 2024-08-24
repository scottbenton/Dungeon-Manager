import { PropsWithChildren } from 'react';
import { fileDropzoneClasses } from './FileDropzone.styles';
import { Text } from '../Text';
import { MaterialIcon } from '../Icon';

export interface FileDropzoneProps extends PropsWithChildren {
  getRootProps: () => any;
  getInputProps: () => any;
  isDragActive: boolean;
  className?: string;
  label: string;
}

export function FileDropzone(props: FileDropzoneProps): JSX.Element {
  const { getRootProps, getInputProps, isDragActive, className, label } = props;

  const { dropzone, icon, textBold, text } = fileDropzoneClasses({
    isDragActive,
  });

  return (
    <div className={className}>
      <Text
        as={'label'}
        variant={'label'}
        color={'textSecondary'}
        htmlFor={`${label}-file-upload`}
      >
        {label}
      </Text>
      <div className={dropzone()} {...getRootProps()}>
        <input id={`${label}-file-upload`} {...getInputProps()} />
        <div className={icon()}>
          <MaterialIcon filled={false} name={'image'} size={'lg'} />
        </div>
        {isDragActive ? (
          <p className={text()}>Drop the files here.</p>
        ) : (
          <p className={text()}>
            <span className={textBold()}>Upload an Image </span>
            or drag and drop files here to upload them
          </p>
        )}
      </div>
    </div>
  );
}
