import React, { Fragment} from "react";
import { Faction, Model, UserModel, UserModelGroup } from "../types/models";
import UserModelGroupDisplay from "./UserModelGroupDisplay";
import Button from "../common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";
import AddUserModelModal, { openAddUserModelModal } from "./AddUserModelModal";

type Props = {
  faction: Faction;
  userModels: UserModel[];
  userModelGroups: UserModelGroup[];
  factionModelById: Record<number, Model>;
  onManageGroupsButtonClick?: () => void;
  className?: string;
}

const ManageUserModels = (props: Props) => {
  const userModelsByGroupId: Record<number, UserModel[]> = props.userModels.reduce((acc: Record<number, UserModel[]>, um) => {
    const groupId = um.user_model_group_id;
    if (!(groupId in acc)) acc[groupId] = [];
    acc[groupId].push(um);
    return acc;
  }, {});

  const userModelsUngrouped = props.userModels.filter((um) => !um.user_model_group_id);

  return (
    <div className={props.className} id='manage-user-models'>
      <div className='flex items-center my-5'>
        <div className='flex-1'>
          <Button onClick={props.onManageGroupsButtonClick}>
            <FontAwesomeIcon icon={byPrefixAndName.fas['layer-group']} className='mr-2' />
            Groups
          </Button>
        </div>
        <div className='flex-1 text-end'>
          <Button onClick={openAddUserModelModal}>
            <FontAwesomeIcon icon={byPrefixAndName.fas['plus']} className='mr-2' />
            New Model(s)
          </Button>
        </div>
      </div>

      {props.userModelGroups.map((group: UserModelGroup) => (
        <Fragment key={group.id}>
          <UserModelGroupDisplay
            userModelGroup={group}
            userModels={userModelsByGroupId[group.id] || []}
            factionModelById={props.factionModelById} />
        </Fragment>
      ))}

      {userModelsUngrouped.length > 0 &&
        <UserModelGroupDisplay
          userModelGroup={undefined}
          userModels={userModelsUngrouped}
          factionModelById={props.factionModelById} />
      }

      <AddUserModelModal
        faction={props.faction}
        factionModels={Object.values(props.factionModelById)}
        userModels={props.userModels} />
    </div>
  );
};

export default ManageUserModels;
