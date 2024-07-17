import React, { useState } from "react";
import { Faction, UserModelGroup } from "../types/models";
import Button from "../common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";
import { apiCall } from "../utils/helpers";
import AddUserModelGroupModal, { hideAddGroupModal, openAddGroupModal } from "./AddUserModelGroupModal";
import EditUserModelGroupModal, { hideEditGroupModal, openEditGroupModal } from "./EditUserModelGroupModal";

type Props = {
  faction: Faction;
  userModelGroups: UserModelGroup[];
  afterSave?: () => void;
  className?: string;
}

export type ProposedUserModelGroup = {
  id?: number;
  name: string;
};

const ManageUserModelGroups = (props: Props) => {
  const [proposedGroups, setProposedGroups] = useState<ProposedUserModelGroup[]>(props.userModelGroups);
  const [draftProposedGroup, setDraftProposedGroup] = useState<ProposedUserModelGroup>();
  const [draftOtherProposedGroups, setDraftOtherProposedGroups] = useState<ProposedUserModelGroup[]>(props.userModelGroups);
  
  function moveGroupUp(index: number) {
    if (index <= 0) throw 'Cannot move top group up!';

    const groupToMoveUp = proposedGroups[index];
    const groupToMoveDown = proposedGroups[index - 1];
    setProposedGroups([
      proposedGroups.slice(0, index - 1),
      groupToMoveUp,
      groupToMoveDown,
      proposedGroups.slice(index + 1)
    ].flat());
  }

  function moveGroupDown(index: number) {
    if (index >= proposedGroups.length - 1) throw 'Cannot move bottom group down!';

    const groupToMoveDown = proposedGroups[index];
    const groupToMoveUp = proposedGroups[index + 1];
    setProposedGroups([
      proposedGroups.slice(0, index),
      groupToMoveUp,
      groupToMoveDown,
      proposedGroups.slice(index + 2)
    ].flat());
  }

  function removeGroup(index: number) {
    setProposedGroups([
      proposedGroups.slice(0, index),
      proposedGroups.slice(index + 1)
    ].flat());
  }

  function handleAddGroupSubmitted(group: ProposedUserModelGroup) {
    hideAddGroupModal();
    setProposedGroups([proposedGroups, group].flat());
  }

  function handleEditGroupSubmitted(origGroup: ProposedUserModelGroup, draftGroup: ProposedUserModelGroup) {
    const editedIndex = proposedGroups.findIndex((group) => (
      (group.id && group.id === origGroup.id) ||
      group.name === origGroup.name
    ));
    setProposedGroups([
      proposedGroups.slice(0, editedIndex),
      draftGroup,
      proposedGroups.slice(editedIndex + 1)
    ].flat());
    setDraftProposedGroup(undefined);
  }

  function handleEditGroupDeleted(groupToDelete: ProposedUserModelGroup) {
    hideEditGroupModal();
    const deletedIndex = proposedGroups.findIndex((group) => (
      (group.id && group.id === groupToDelete.id) ||
      group.name === groupToDelete.name
    ));
    console.log('deleting index' + deletedIndex);
    removeGroup(deletedIndex);
  }

  function handleProposedGroupClicked(group: ProposedUserModelGroup, index: number) {
    setDraftProposedGroup(group);
    setDraftOtherProposedGroups([proposedGroups.slice(0, index), proposedGroups.slice(index + 1)].flat());
    openEditGroupModal();
  }

  function saveProposedGroups() {
    apiCall({
      endpoint: '/my-collection/factions/'+props.faction.id+'/groups',
      method: 'POST',
      body: {
        user_model_groups: proposedGroups.map((group, index) => (
          {
            id: group.id,
            name: group.name,
            sort_index: index
          }
        ))
      }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error)
        if (props.afterSave) props.afterSave();
      })
  }

  return (
    <div className={props.className} id='manage-user-models'>
      <div className='flex items-center my-5'>
        <div className='flex-1'>
          <Button onClick={saveProposedGroups}>
            <FontAwesomeIcon icon={byPrefixAndName.fas['layer-group']} className='mr-2' />
            Save
          </Button>
        </div>
      </div>

      <div className='text-xl my-5'>
        Model Groups
      </div>

      {proposedGroups.map((group, index) => (
        <div
          key={index}
          className='my-5 p-4 border-2 border-gray-200 rounded flex items-center'>
            <div
              className='flex-1 cursor-pointer'
              onClick={() => handleProposedGroupClicked(group, index)}>
                <span className='text-xl'>{group.name}</span>
                <FontAwesomeIcon
                  icon={byPrefixAndName.fas['pencil']}
                  className='ml-5'
                  size='lg' />
            </div>
            <div className='flex-1 text-end'>
              <div>
                {index > 0 &&
                  <FontAwesomeIcon
                    icon={byPrefixAndName.fas['up']}
                    onClick={() => moveGroupUp(index)}
                    className='cursor-pointer'
                    size='xl' />
                }
              </div>
              <div>
                {index < proposedGroups.length - 1 &&
                  <FontAwesomeIcon
                    icon={byPrefixAndName.fas['down']}
                    onClick={() => moveGroupDown(index)}
                    className={'cursor-pointer'+(index > 0 ? ' mt-4' : '')}
                    size='xl' />
                }
              </div>
            </div>
        </div>
      ))}

      <div className='my-5 p-5 border-2 border-gray-200 rounded flex items-center'>
        <div className='flex-1 text-xl'>
          Ungrouped
        </div>
      </div>

      <div className='my-5 p-5 border-dashed border-2 border-gray-200 rounded flex items-center cursor-pointer'>
        <div className='flex-1 text-xl' onClick={openAddGroupModal}>
          <FontAwesomeIcon icon={byPrefixAndName.fas['layer-plus']} className='mr-2' />
          Add Group
        </div>
      </div>

      <AddUserModelGroupModal
        proposedGroups={proposedGroups}
        onSubmit={handleAddGroupSubmitted} />
      
      <EditUserModelGroupModal
        group={draftProposedGroup}
        otherProposedGroups={draftOtherProposedGroups}
        onSubmit={handleEditGroupSubmitted}
        onDelete={handleEditGroupDeleted} />
    </div>
  );
};

export default ManageUserModelGroups;