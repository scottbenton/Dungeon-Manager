export interface OtherImageProps {
  imageUrl?: string;
}

export function OtherImage(props: OtherImageProps) {
  const { imageUrl } = props;

  return (
    <div className={'rounded-lg shadow-inner overflow-hidden w-full h-48 flex'}>
      {imageUrl ? (
        <img
          src={imageUrl}
          className={'min-h-full min-w-full object-cover object-center'}
          alt={'NPC Image'}
        />
      ) : (
        <div
          className={'h-full w-full bg-gray-200 animate-pulse dark:bg-gray-600'}
        ></div>
      )}
    </div>
  );
}
