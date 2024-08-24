import { ImageCard } from '../ImageCard';

export interface ImageListProps {
  imageOrder: string[];
  selectedImageId?: string;
}

export function ImageList(props: ImageListProps): JSX.Element {
  const { imageOrder, selectedImageId } = props;

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
      {imageOrder.map((imageId) => (
        <ImageCard
          key={imageId}
          id={imageId}
          isSelected={selectedImageId === imageId}
        />
      ))}
    </div>
  );
}
