import AddIcon from '@heroicons/react/20/solid/PlusIcon';
import { useState } from 'react';
import { Tag } from './Tag';
import { AddTagButton, TagList as StyledList } from './Tags.styles';

export interface TagListProps {
  tags: string[];
  handleDelete?: (tag: string) => void;
  handleAdd?: (tag: string) => void;
}

export function TagList(props: TagListProps): JSX.Element {
  const { tags, handleAdd, handleDelete } = props;

  return (
    <StyledList>
      {tags.map((tag) => (
        <Tag
          key={tag}
          handleDelete={handleDelete ? () => handleDelete(tag) : undefined}
        >
          {tag}
        </Tag>
      ))}
      {handleAdd && (
        <AddTagButton type={'button'}>
          <AddIcon />
        </AddTagButton>
      )}
    </StyledList>
  );
}

TagList.defaultProps = {
  handleDelete: undefined,
  handleAdd: undefined,
};
