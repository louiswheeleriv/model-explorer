import React, { Fragment } from "react";
import { Faction, Model, UserFaction, UserModel, UserModelGroup } from "../types/models";
import UserModelGroupDisplay from "./UserModelGroupDisplay";
import Button from "../common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";
import AddUserModelModal, { openAddUserModelModal } from "./AddUserModelModal";
import SummaryProgressBar from "../common/SummaryProgressBar";
import { countByStatus } from "../utils/helpers";

type Props = {
  faction: Faction;
  userFaction: UserFaction;
  userModels: UserModel[];
  userModelGroups: UserModelGroup[];
  factionModelById: Record<number, Model>;
  onManageGroupsButtonClick?: () => void;
  className?: string;
}

const UserFactionModels = (props: Props) => {
  const userModelsByGroupId: Record<number, UserModel[]> = props.userModels.reduce((acc: Record<number, UserModel[]>, um) => {
    const groupId = um.user_model_group_id;
    if (!(groupId in acc)) acc[groupId] = [];
    acc[groupId].push(um);
    return acc;
  }, {});

  const userModelsUngrouped = props.userModels.filter((um) => !um.user_model_group_id);

  let numByStatus = countByStatus(props.userModels);
  const valueByLabel = {
    'Models': props.userModels.reduce((acc, um) => (
      acc + um.qty_unassembled + um.qty_assembled + um.qty_in_progress + um.qty_finished
    ), 0),
    'Complete': Math.round((numByStatus['finished'] / Object.values(numByStatus).reduce((acc, num) => acc + num, 0) * 100)) + '%'
  }

  return (
    <div className={props.className} id='manage-user-models'>
      <SummaryProgressBar
        numByStatus={numByStatus}
        valueByLabel={valueByLabel}
      />
      
      <div className='flex items-center my-5'>
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
            faction={props.faction}
            userFaction={props.userFaction}
            userModelGroup={group}
            userModels={userModelsByGroupId[group.id] || []}
            factionModelById={props.factionModelById} />
        </Fragment>
      ))}

      {userModelsUngrouped.length > 0 &&
        <UserModelGroupDisplay
          faction={props.faction}
          userFaction={props.userFaction}
          userModelGroup={undefined}
          userModels={userModelsUngrouped}
          factionModelById={props.factionModelById} />
      }

      <AddUserModelModal
        faction={props.faction}
        factionModels={Object.values(props.factionModelById)}
        userModels={props.userModels}
        userModelGroups={props.userModelGroups} />
    </div>
  );
};

export default UserFactionModels;
