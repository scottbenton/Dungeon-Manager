import { PropsWithChildren } from 'react';
import { CSS } from '@stitches/react';
import { PhotoIcon } from '@heroicons/react/24/outline';
import {
  Dropzone,
  DropzoneContainer,
  DropzoneIcon,
  DropzoneText,
} from './FileDropzone.styles';
import { Text } from '../Text';

export interface FileDropzoneProps extends PropsWithChildren {
  getRootProps: () => any;
  getInputProps: () => any;
  isDragActive: boolean;
  css?: CSS;
  label: string;
}

export function FileDropzone(props: FileDropzoneProps): JSX.Element {
  const { getRootProps, getInputProps, isDragActive, css, label } = props;

  return (
    <DropzoneContainer css={css}>
      <Text
        as={'label'}
        variant={'label'}
        color={'textSecondary'}
        htmlFor={`${label}-file-upload`}
      >
        {label}
      </Text>
      <Dropzone {...getRootProps()} isDragActive={isDragActive}>
        <input id={`${label}-file-upload`} {...getInputProps()} />
        <DropzoneIcon>
          <PhotoIcon />
        </DropzoneIcon>
        {isDragActive ? (
          <DropzoneText isDragActive>Drop the files here.</DropzoneText>
        ) : (
          <DropzoneText isDragActive={false}>
            <span>Upload an Image </span>
            or drag and drop files here to upload them
          </DropzoneText>
        )}
      </Dropzone>
    </DropzoneContainer>
  );
}

FileDropzone.defaultProps = {
  css: undefined,
};
