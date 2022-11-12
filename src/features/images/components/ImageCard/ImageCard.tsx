import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { useReduxSelector } from '@/hooks/reduxHooks';
import { useEffect, useRef, useState } from 'react';
import EditIcon from '@heroicons/react/20/solid/PencilIcon';
import DeleteIcon from '@heroicons/react/20/solid/TrashIcon';
import SaveIcon from '@heroicons/react/20/solid/CheckIcon';
import CancelIcon from '@heroicons/react/20/solid/XMarkIcon';
import {
  ButtonContainer,
  ImageContainer,
  SelectedCheckIcon,
  StyledImageCard,
  StyledInput,
} from './ImageCard.styles';
import { selectImage } from '../../api/selectImage';
import { deleteImageItem } from '../../api/deleteImageItem';
import { updateImageItemDisplayName } from '../../api/updateImageItem';

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

  return (
    <StyledImageCard
      padding={false}
      hovering={isHovering}
      selected={isSelected}
    >
      <button
        type={'button'}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => {
          if (uid) {
            selectImage(uid, id);
          }
        }}
      >
        <ImageContainer
          css={{
            backgroundImage: isSelected
              ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${item.url})`
              : `url(${item.url})`,
          }}
        >
          {isSelected && <SelectedCheckIcon />}
        </ImageContainer>
        {isEditing ? (
          <StyledInput
            ref={inputRef}
            value={newName}
            onChange={(evt) => setNewName(evt.currentTarget.value)}
          />
        ) : (
          <Text
            textColor={isSelected ? 'brandSecondary' : 'textSecondary'}
            variant={'h4'}
            textAlign={'center'}
            css={{
              paddingX: '$s-1',
              paddingY: '$s-2',
              fontWeight: '$light',
              borderBottomWidth: '$1',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {item.label}
          </Text>
        )}
      </button>
      <ButtonContainer>
        {isEditing ? (
          <>
            <Button
              startIcon={SaveIcon}
              color={'success'}
              onClick={() => saveNewName()}
            >
              Save
            </Button>
            <Button
              startIcon={CancelIcon}
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
              startIcon={EditIcon}
              color={'brand'}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button
              startIcon={DeleteIcon}
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
      </ButtonContainer>
    </StyledImageCard>
  );
}
