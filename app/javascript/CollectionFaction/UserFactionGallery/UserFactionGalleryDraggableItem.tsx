import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Button from '../../common/Button';

type Props = {
  image: ProposedImage;
  onDelete: (image: ProposedImage) => void;
};

export type ProposedImage = {
  id: string;
  userImageId?: number;
  imageUrl: string;
}

const UserFactionGalleryDraggableItem = (props: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: props.image.id,
  });

  return (
    <li
      className='my-5 p-4 border-2 border-gray-200 rounded flex items-center touch-none h-[300px]'
      ref={setNodeRef}
      {...attributes}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}>

      <img
        src={props.image.imageUrl}
        className='flex-1 mx-auto max-w-[70%] h-full object-contain' />

      <div className='flex-none flex flex-col h-full'>
        <div className='flex-1'>
          <FontAwesomeIcon
            icon={byPrefixAndName.fas['grip-vertical']}
            size='xl'
            className='flex-none p-5 cursor-grab'
            {...listeners} />
        </div>
        <div className='flex-1 flex items-end'>
          <Button
            onClick={() => props.onDelete(props.image)}
            className='flex-none mx-auto bg-red-500'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['trash']} className='text-white' />
          </Button>
        </div>
      </div>
    </li>
  );
}

export default UserFactionGalleryDraggableItem;