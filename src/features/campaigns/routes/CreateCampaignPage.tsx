import { Button } from '@/components/Button';
import { ImageUploaderAndPreviewer } from '@/components/ImageUploaderAndPreviewer/ImageUploaderAndPreviewer';
import { Input } from '@/components/Input';
import { Text } from '@/components/Text';
import { useReduxSelector } from '@/hooks/reduxHooks';
import { getRenamedFileWithUUIDName } from '@/lib/getUUID';
import { CampaignRole, CampaignType } from '@/types/campaign.type';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCampaign } from '../api/createCampaign';
import { Alert } from '@/components/Alert';
import { paths } from '@/routes';

export default function CreateCampaignPage() {
  const uid = useReduxSelector((state) => state.auth.user?.id);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!uid) return;

    const campaignName = event.currentTarget.campaignName.value;
    const images = event.currentTarget.campaignImage.files;

    setErrorMessage(undefined);
    setIsLoading(true);

    const newCampaignImage = images?.[0]
      ? getRenamedFileWithUUIDName(images[0])
      : undefined;

    const campaign: CampaignType = {
      name: campaignName || 'New Campaign',
      campaignImageFilename: newCampaignImage?.name ?? null,
      users: [uid],
      currentImage: null,
      userRoles: {
        [uid]: CampaignRole.GM,
      },
    };

    createCampaign(campaign, newCampaignImage)
      .then((campaignId) => {
        navigate(paths.campaign(campaignId));
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Failed to create campaign');
        setIsLoading(false);
      });
  };

  return (
    <div className={'max-w-sm mx-auto w-full'}>
      <Text as={'h1'} variant={'h5'}>
        Create Campaign
      </Text>
      {errorMessage && (
        <Alert variant={'error'} title={'Error'} message={errorMessage} />
      )}
      <form className={'space-y-4 mt-6'} onSubmit={handleSubmit}>
        <Input label={'Campaign Name'} name={'campaignName'} />
        <ImageUploaderAndPreviewer
          label={'Campaign Image'}
          inputName='campaignImage'
        />
        <div className={'flex justify-end'}>
          <Button
            type={'submit'}
            color={'primary'}
            variant={'primary'}
            loading={isLoading}
          >
            Create Campaign
          </Button>
        </div>
      </form>
    </div>
  );
}
