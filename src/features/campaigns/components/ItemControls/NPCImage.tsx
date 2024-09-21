export interface NPCImageProps {
  imageUrl?: string;
}

export function NPCImage(props: NPCImageProps) {
  const { imageUrl } = props;

  return (
    <div className={'flex items-center justify-center'}>
      <div className={'w-48 h-48 shadow-inner rounded-lg overflow-hidden'}>
        {imageUrl ? (
          <img
            src={imageUrl}
            className={
              'min-h-full min-w-full object-cover object-center w-48 h-48 '
            }
            alt={'NPC Image'}
          />
        ) : (
          <div
            className={'w-32 h-32 bg-gray-200 animate-pulse dark:bg-gray-600'}
          ></div>
        )}
      </div>
    </div>
  );
}
