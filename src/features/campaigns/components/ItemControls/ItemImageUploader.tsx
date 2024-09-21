import { Button } from '@/components/Button';
import { Dialog } from '@/components/Dialog';
import { ImageUploaderAndPreviewer } from '@/components/ImageUploaderAndPreviewer/ImageUploaderAndPreviewer';
import { FormEvent, useState } from 'react';
import { useCampaignContext } from '../../context/CampaignContext';
import { ItemTypes } from '@/types/item.type';
import { getRenamedFileWithUUIDName } from '@/lib/getUUID';
import { uploadItemImage } from '../../api/items/uploadItemImage';

export interface ItemImageUploaderProps {
  open: boolean;
  onClose: () => void;
  existingImageURL?: string;
  itemType: ItemTypes;
  itemId: string;
}
export function ItemImageUploader(props: ItemImageUploaderProps) {
  const { open, onClose, existingImageURL, itemType, itemId } = props;

  const { campaignId } = useCampaignContext();

  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    const images = event.currentTarget.campaignImage.files;

    const newCampaignImage = images?.[0]
      ? getRenamedFileWithUUIDName(images[0])
      : undefined;

    uploadItemImage(campaignId, itemType, itemId, newCampaignImage)
      .then(() => {
        onClose();
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Dialog
      open={open}
      setOpen={onClose}
      title='Upload Image'
      content={
        <form className={'space-y-4 mt-6'} onSubmit={handleSubmit}>
          <ImageUploaderAndPreviewer
            label={'Campaign Image'}
            inputName='campaignImage'
            existingImageURL={existingImageURL}
          />
          <div className={'flex justify-end'}>
            <Button
              type={'submit'}
              color={'primary'}
              variant={'primary'}
              loading={isLoading}
            >
              Save Changes
            </Button>
          </div>
        </form>
      }
    />
  );
}
