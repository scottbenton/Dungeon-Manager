import { ImageItemObject } from '../../types/ImageItemObject';
import { ImageCard } from '../ImageCard';
import { ImageGrid } from './ImageList.styles';

export interface ImageListProps {
  imageOrder: string[];
  selectedImageId?: string;
}

export function ImageList(props: ImageListProps): JSX.Element {
  const { imageOrder, selectedImageId } = props;

  return (
    <ImageGrid
      columns={{
        '@sm': 2,
        '@md': 3,
      }}
    >
      {imageOrder.map((imageId) => (
        <ImageCard
          key={imageId}
          id={imageId}
          isSelected={selectedImageId === imageId}
        />
      ))}
    </ImageGrid>
  );
}

ImageList.defaultProps = {
  selectedImageId: undefined,
};
