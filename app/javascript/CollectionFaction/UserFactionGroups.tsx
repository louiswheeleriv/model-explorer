import React, { useState } from "react";
import { Faction, UserFaction, UserModelGroup } from "../types/models";
import Button from "../common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";
import { apiCall } from "../utils/helpers";
import AddUserModelGroupModal from "./AddUserModelGroupModal";
import EditUserModelGroupModal from "./EditUserModelGroupModal";

type Props = {
  faction: Faction;
  userFaction: UserFaction;
  userModelGroups: UserModelGroup[];
  afterSave?: () => void;
  className?: string;
}

export type ProposedUserModelGroup = {
  id?: number;
  name: string;
};

const UserFactionGroups = (props: Props) => {
  const [proposedGroups, setProposedGroups] = useState<ProposedUserModelGroup[]>(props.userModelGroups);
  const [draftProposedGroup, setDraftProposedGroup] = useState<ProposedUserModelGroup>();
  const [draftOtherProposedGroups, setDraftOtherProposedGroups] = useState<ProposedUserModelGroup[]>(props.userModelGroups);

  const [addGroupModalVisible, setAddGroupModalVisible] = useState<boolean>(false);
  const [editGroupModalVisible, setEditGroupModalVisible] = useState<boolean>(false);
  
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

  function handleAddGroupClicked() {
    setAddGroupModalVisible(true);
  }

  function handleAddGroupSubmitted(group: ProposedUserModelGroup) {
    setAddGroupModalVisible(false);
    setProposedGroups([proposedGroups, group].flat());
  }

  function handleEditGroupClicked(group: ProposedUserModelGroup, index: number) {
    setDraftProposedGroup(group);
    setDraftOtherProposedGroups([proposedGroups.slice(0, index), proposedGroups.slice(index + 1)].flat());
    setEditGroupModalVisible(true);
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
    setEditGroupModalVisible(false);
    setDraftProposedGroup(undefined);
  }

  function handleEditGroupDeleted(groupToDelete: ProposedUserModelGroup) {
    setEditGroupModalVisible(false);
    const deletedIndex = proposedGroups.findIndex((group) => (
      (group.id && group.id === groupToDelete.id) ||
      group.name === groupToDelete.name
    ));
    removeGroup(deletedIndex);
  }

  function handleEditGroupClosed() {
    setEditGroupModalVisible(false);
  }

  function saveProposedGroups() {
    apiCall({
      endpoint: '/user-factions/'+props.userFaction.id+'/groups',
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
      <div className='text-xl my-5'>
        Model Groups
      </div>

      {proposedGroups.map((group, index) => (
        <div
          key={index}
          className='my-5 p-4 border-2 border-gray-200 rounded flex items-center'>
            <div
              className='flex-1 cursor-pointer'
              onClick={() => handleEditGroupClicked(group, index)}>
                <span className='text-2xl'>{group.name}</span>
                <FontAwesomeIcon
                  icon={byPrefixAndName.fas['pencil']}
                  className='ml-5'
                  size='lg' />
            </div>
            <div className='flex-none text-end'>
              <div>
                {index > 0 &&
                  <FontAwesomeIcon
                    icon={byPrefixAndName.fas['up']}
                    onClick={() => moveGroupUp(index)}
                    className='cursor-pointer p-3'
                    size='2xl' />
                }
              </div>
              <div>
                {index < proposedGroups.length - 1 &&
                  <FontAwesomeIcon
                    icon={byPrefixAndName.fas['down']}
                    onClick={() => moveGroupDown(index)}
                    className='cursor-pointer p-3'
                    size='2xl' />
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
        <div className='flex-1 text-xl' onClick={handleAddGroupClicked}>
          <FontAwesomeIcon icon={byPrefixAndName.fas['layer-plus']} className='mr-2' />
          Add Group
        </div>
      </div>

      <div className='flex items-center my-5'>
        <Button onClick={saveProposedGroups} className='mx-auto px-5'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['layer-group']} className='mr-2' />
          Save
        </Button>
      </div>

      <AddUserModelGroupModal
        visible={addGroupModalVisible}
        proposedGroups={proposedGroups}
        onSubmit={handleAddGroupSubmitted}
        onClose={() => {setAddGroupModalVisible(false)}} />
      
      <EditUserModelGroupModal
        visible={editGroupModalVisible}
        group={draftProposedGroup}
        otherProposedGroups={draftOtherProposedGroups}
        onSubmit={handleEditGroupSubmitted}
        onDelete={handleEditGroupDeleted}
        onClose={handleEditGroupClosed} />
    </div>
  );
};

export default UserFactionGroups;
