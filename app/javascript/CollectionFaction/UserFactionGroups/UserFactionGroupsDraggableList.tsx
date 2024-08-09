import React, { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from '@dnd-kit/core';

import UserFactionGroupsDraggableItem, { ProposedUserModelGroup } from "./UserFactionGroupsDraggableItem";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";
import AddUserModelGroupModal from "./AddUserModelGroupModal";
import EditUserModelGroupModal from "./EditUserModelGroupModal";

type Props = {
  groups: ProposedUserModelGroup[];
  onGroupsUpdated: (groups: ProposedUserModelGroup[]) => void;
}

const UserFactionGroupsDraggableList = (props: Props) => {
  const [groups, setGroups] = useState<ProposedUserModelGroup[]>(props.groups);
  const [addGroupModalVisible, setAddGroupModalVisible] = useState<boolean>(false);
  const [editGroupModalVisible, setEditGroupModalVisible] = useState<boolean>(false);

  const [draftGroup, setDraftGroup] = useState<ProposedUserModelGroup>();
  
  function reorderList(e: DragEndEvent) {
    if (!e.over) return;

    if (e.active.id !== e.over.id) {
      setGroups((groups) => {
        const oldIndex = groups.findIndex((group) => group.id === e.active.id.toString());
        const newIndex = groups.findIndex((group) => group.id === e.over?.id.toString());
        return arrayMove(groups, oldIndex, newIndex);
      })
    }
  }

  function removeGroup(index: number) {
    setGroups([
      groups.slice(0, index),
      groups.slice(index + 1)
    ].flat());
  }

  function handleAddGroupClicked() {
    setAddGroupModalVisible(true);
  }

  function handleAddGroupSubmitted(group: ProposedUserModelGroup) {
    setAddGroupModalVisible(false);
    setGroups([groups, group].flat());
  }

  function handleEditGroupClicked(group: ProposedUserModelGroup) {
    setDraftGroup(group);
    setEditGroupModalVisible(true);
  }

  function handleEditGroupSubmitted(draftGroup: ProposedUserModelGroup) {
    const editedIndex = groups.findIndex((group) => group.id === draftGroup.id);
    setGroups([
      groups.slice(0, editedIndex),
      draftGroup,
      groups.slice(editedIndex + 1)
    ].flat());
    setEditGroupModalVisible(false);
    setDraftGroup(undefined);
  }

  function handleEditGroupDeleted(groupToDelete: ProposedUserModelGroup) {
    setEditGroupModalVisible(false);
    const deletedIndex = groups.findIndex((group) => (
      (group.id && group.id === groupToDelete.id) ||
      group.name === groupToDelete.name
    ));
    removeGroup(deletedIndex);
  }

  function handleEditGroupClosed() {
    setEditGroupModalVisible(false);
  }

  useEffect(() => {
    props.onGroupsUpdated(groups);
  }, [groups]);

  return (
    <div>
      <DndContext onDragEnd={reorderList}>
        <SortableContext items={groups}>
          <ul>
            {groups.map((group) => (
              <UserFactionGroupsDraggableItem
                key={group.id}
                group={group}
                onEdit={() => handleEditGroupClicked(group)} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      <div className='my-5 p-5 border-2 border-gray-200 rounded flex items-center'>
        <div className='flex-1 text-xl'>
          Ungrouped
        </div>
      </div>

      <div className='my-5 p-5 border-dashed border-2 border-gray-200 rounded flex items-center cursor-pointer'>
        <div className='flex-1 text-xl' onClick={handleAddGroupClicked}>
          <FontAwesomeIcon icon={byPrefixAndName.fas['layer-plus']} className='mr-2' />
          Add Group
        </div>
      </div>

      <AddUserModelGroupModal
        visible={addGroupModalVisible}
        proposedGroups={groups}
        onSubmit={handleAddGroupSubmitted}
        onClose={() => {setAddGroupModalVisible(false)}} />
      
      <EditUserModelGroupModal
        visible={editGroupModalVisible}
        group={draftGroup}
        groups={groups}
        onSubmit={handleEditGroupSubmitted}
        onDelete={handleEditGroupDeleted}
        onClose={handleEditGroupClosed} />

    </div>
  );
};

export default UserFactionGroupsDraggableList;
