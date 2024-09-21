import { useRef, useState } from 'react';
import { Button } from '../Button';
import { Text } from '../Text';

export interface ImageUploaderAndPreviewerProps {
  image?: File;
  existingImageURL?: string;
  onImageChange?: (image: File | undefined) => void;
  inputName: string;
  label: string;
}

export function ImageUploaderAndPreviewer(
  props: ImageUploaderAndPreviewerProps,
) {
  const { label, image, existingImageURL, onImageChange, inputName } = props;

  const [visibleImage, setVisibleImage] = useState<string | undefined>(
    existingImageURL,
  );
  const [hasUploadedImage, setHasUploadedImage] = useState<boolean>(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setVisibleImage(URL.createObjectURL(files[0]));
      setHasUploadedImage(true);
      onImageChange && onImageChange(files[0]);
    }
  };

  const handleClearImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      setVisibleImage(undefined);
      setHasUploadedImage(false);
      onImageChange && onImageChange(undefined);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <Text
        as={'label'}
        variant={'label'}
        htmlFor={inputName}
        className={'mb-1'}
      >
        {label}
      </Text>
      <input
        ref={fileInputRef}
        hidden
        type='file'
        name={inputName}
        accept='image/*'
        onChange={handleImageChange}
        id={inputName}
      />
      {visibleImage ? (
        <img src={visibleImage} alt='Preview' className={'w-full rounded-xl'} />
      ) : (
        <div
          className={
            'w-full aspect-video  bg-gray-300 dark:bg-gray-600 rounded-xl'
          }
        />
      )}
      <div className={'space-x-1 mt-1 flex'}>
        <Button
          type={'button'}
          variant={'secondary'}
          color={'neutral'}
          onClick={() => fileInputRef.current?.click()}
        >
          {image ? 'Change Image' : 'Upload Image'}
        </Button>
        {hasUploadedImage && (
          <Button type={'button'} color='error' onClick={handleClearImage}>
            Remove Image
          </Button>
        )}
      </div>
    </div>
  );
}
