import React, { useEffect, useState } from "react";
import { Faction, UserFaction, UserModelGroup } from "../../types/models";
import Button from "../../common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";
import { apiCall } from "../../utils/helpers";
import UserFactionGroupsDraggableList from "./UserFactionGroupsDraggableList";
import { ProposedUserModelGroup } from "./UserFactionGroupsDraggableItem";

type Props = {
  faction: Faction;
  userFaction: UserFaction;
  userModelGroups: UserModelGroup[];
  afterSave?: () => void;
  className?: string;
}

const UserFactionGroups = (props: Props) => {
  const [groups, setGroups] = useState<ProposedUserModelGroup[]>(
    props.userModelGroups.map((group) => ({
      id: group.id.toString(),
      userModelGroupId: group.id,
      name: group.name
    }))
  );
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

  useEffect(() => {
    setSaveButtonDisabled(
      props.userModelGroups.length === groups.length &&
        props.userModelGroups.every((origGroup, index) => {
          const group = groups[index];
          return group &&
            group.userModelGroupId === origGroup.id &&
            group.name === origGroup.name
        })
    );
  }, [groups]);
  
  function saveGroups() {
    apiCall({
      endpoint: '/user-factions/'+props.userFaction.id+'/groups',
      method: 'POST',
      body: {
        user_model_groups: groups.map((group, index) => ({
          id: group.userModelGroupId,
          name: group.name,
          sort_index: index
        }))
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
      <div className='flex my-5'>
        <div className='flex-1 text-xl'>
          Model Groups
        </div>
        <div className='flex-none'>
          <Button
            onClick={saveGroups}
            disabled={saveButtonDisabled}
            className='px-5'>
            <FontAwesomeIcon
              icon={byPrefixAndName.fas['floppy-disk']}
              className='mr-2' />
            Save
          </Button>
        </div>
      </div>

      <UserFactionGroupsDraggableList
        groups={groups}
        onGroupsUpdated={setGroups} />      
    </div>
  );
};

export default UserFactionGroups;
