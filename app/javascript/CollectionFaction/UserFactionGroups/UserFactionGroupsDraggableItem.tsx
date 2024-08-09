import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Props = {
  group: ProposedUserModelGroup;
  onEdit: (group: ProposedUserModelGroup) => void;
};

export type ProposedUserModelGroup = {
  id: string;
  userModelGroupId?: number;
  name: string;
};

const UserFactionGroupsDraggableItem = (props: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: props.group.id,
  });

  return (
    <li
      className='my-5 p-4 border-2 border-gray-200 rounded flex items-center touch-none'
      ref={setNodeRef}
      {...attributes}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}>

      <div
        className='flex-1 py-5 text-xl cursor-pointer'
        onClick={() => props.onEdit(props.group)}>

        {props.group.name}
      </div>

      <FontAwesomeIcon
        icon={byPrefixAndName.fas['grip-vertical']}
        size='xl'
        className='flex-none p-5 cursor-grab'
        {...listeners} />
    </li>
  );
}

export default UserFactionGroupsDraggableItem;