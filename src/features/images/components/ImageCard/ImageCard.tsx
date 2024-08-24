import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { useReduxSelector } from '@/hooks/reduxHooks';
import { useEffect, useRef, useState } from 'react';
import { imageCardStyles } from './ImageCard.styles';
import { selectImage } from '../../api/selectImage';
import { deleteImageItem } from '../../api/deleteImageItem';
import { updateImageItemDisplayName } from '../../api/updateImageItem';
import { Card } from '@/components/Card';
import { MATERIAL_ICON_VARIANTS } from '@/components/Icon/MaterialIcon.types';
import { MaterialIcon } from '@/components/Icon';

export interface ImageCardProps {
  id: string;
  isSelected: boolean;
}

export function ImageCard(props: ImageCardProps): JSX.Element {
  const { id, isSelected } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { uid, item } = useReduxSelector((state) => ({
    uid: state.auth.user?.id || '',
    item: state.images.images[id],
  }));

  const [newName, setNewName] = useState<string>(item.label || '');

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setNewName(item.label);
  }, [item]);

  const saveNewName = () => {
    updateImageItemDisplayName(uid, id, newName);
    setIsEditing(false);
  };

  const { card } = imageCardStyles({
    selected: isSelected,
    hovering: isHovering,
  });

  return (
    <Card className={card()} padding={false}>
      <button
        className={'flex flex-col'}
        type={'button'}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => {
          if (uid) {
            selectImage(uid, isSelected ? undefined : id);
          }
        }}
      >
        <div
          className={'aspect-video w-fill bg-cover bg-center'}
          style={{
            backgroundImage: isSelected
              ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${item.url})`
              : `url(${item.url})`,
          }}
        >
          {isSelected && (
            <MaterialIcon
              className={'text-white m-2 float-right'}
              name={'check_circle'}
              size={'md'}
              variant={MATERIAL_ICON_VARIANTS.ROUNDED}
              filled
            />
          )}
        </div>
        {isEditing ? (
          <input
            className='text-xl font-light px-1 py-2 border-b h-[45px] bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-primary-500 border'
            ref={inputRef}
            value={newName}
            onChange={(evt) => setNewName(evt.currentTarget.value)}
          />
        ) : (
          <Text
            textColor={isSelected ? 'secondary' : 'textSecondary'}
            variant={'h4'}
            textAlign={'center'}
            className={
              'px-1 py-2 font-ligh border-b overflow-hidden text-ellipsis whitespace-nowrap'
            }
          >
            {item.label}
          </Text>
        )}
      </button>
      <div className={'flex'}>
        {isEditing ? (
          <>
            <Button
              className={'w-1/2 rounded-none flex justify-center'}
              startIcon={'check'}
              color={'success'}
              onClick={() => saveNewName()}
            >
              Save
            </Button>
            <Button
              className={'w-1/2 rounded-none flex justify-center'}
              startIcon={'close'}
              color={'neutral'}
              onClick={() => {
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              className={'w-1/2 rounded-none flex justify-center'}
              startIcon={'edit_square'}
              color={'primary'}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button
              className={'w-1/2 rounded-none flex justify-center'}
              startIcon={'delete'}
              color={'error'}
              onClick={() => {
                if (uid) {
                  deleteImageItem(uid, item);
                }
              }}
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
