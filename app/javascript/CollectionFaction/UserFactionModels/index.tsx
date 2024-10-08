import React, { Fragment, useState } from "react";
import { Faction, Model, UserFaction, UserModel, UserModelGroup, UserImageAssociation } from "../../types/models";
import UserModelGroupDisplay from "./UserModelGroupDisplay";
import Button from "../../common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";
import AddUserModelModal from "./AddUserModelModal";
import SummaryProgressBar from "../../common/SummaryProgressBar";
import { countByStatus } from "../../utils/helpers";

type Props = {
  isCurrentUser: boolean;
  faction: Faction;
  userFaction: UserFaction;
  userModels: UserModel[];
  userModelGroups: UserModelGroup[];
  userImageAssociationsByUserModelId: Record<number, UserImageAssociation[]>;
  factionModelById: Record<number, Model>;
  onManageGroupsButtonClick?: () => void;
  className?: string;
}

const UserFactionModels = (props: Props) => {
  const [addUserModelModalVisible, setAddUserModelModalVisible] = useState(false);

  const userModelsByGroupId: Record<number, UserModel[]> = props.userModels.reduce((acc: Record<number, UserModel[]>, um) => {
    const groupId = um.user_model_group_id;
    if (!(groupId in acc)) acc[groupId] = [];
    acc[groupId].push(um);
    return acc;
  }, {});

  const userModelsUngrouped = props.userModels.filter((um) => !um.user_model_group_id);

  let numByStatus = countByStatus(props.userModels);
  const totalNumModels = Object.values(numByStatus).reduce((acc, num) => acc + num);
  const valueByLabel = {
    'Models': props.userModels.reduce((acc, um) => (
      acc + um.qty_unassembled + um.qty_assembled + um.qty_in_progress + um.qty_finished
    ), 0),
    'Complete': totalNumModels > 0 ? Math.round(((numByStatus['finished'] / totalNumModels) * 100)) + '%' : '0%'
  }

  return (
    <div className={props.className} id='manage-user-models'>
      <SummaryProgressBar
        numByStatus={numByStatus}
        valueByLabel={valueByLabel}
      />
      
      {props.isCurrentUser &&
        <div className='flex items-center my-5'>
          <div className='flex-1 text-end'>
            <Button onClick={() => setAddUserModelModalVisible(true)}>
              <FontAwesomeIcon icon={byPrefixAndName.fas['plus']} className='mr-2' />
              New Model(s)
            </Button>
          </div>
          <AddUserModelModal
            visible={addUserModelModalVisible}
            onClose={() => setAddUserModelModalVisible(false)}
            isCurrentUser={props.isCurrentUser}
            faction={props.faction}
            userFaction={props.userFaction}
            factionModels={Object.values(props.factionModelById)}
            userModels={props.userModels}
            userModelGroups={props.userModelGroups} />
        </div>
      }

      {props.userModelGroups.map((group: UserModelGroup) => (
        <Fragment key={group.id}>
          <UserModelGroupDisplay
            faction={props.faction}
            userFaction={props.userFaction}
            userModelGroup={group}
            userModels={userModelsByGroupId[group.id] || []}
            userImageAssociationsByUserModelId={props.userImageAssociationsByUserModelId}
            factionModelById={props.factionModelById} />
        </Fragment>
      ))}

      {userModelsUngrouped.length > 0 &&
        <UserModelGroupDisplay
          faction={props.faction}
          userFaction={props.userFaction}
          userModelGroup={undefined}
          userModels={userModelsUngrouped}
          userImageAssociationsByUserModelId={props.userImageAssociationsByUserModelId}
          factionModelById={props.factionModelById} />
      }
    </div>
  );
};

export default UserFactionModels;
