import React, { Fragment } from "react";
import { Faction, Model, UserModel, UserModelGroup } from "../types/models";
import SummaryProgressBar from "../common/SummaryProgressBar";
import UserModelGroupDisplay from "./UserModelGroupDisplay";
import Button from "../common/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import { countByStatus } from "../utils/helpers";
import AddUserModelModal, { openAddUserModelModal } from "./AddUserModelModal";

type Props = {
  faction: Faction;
  faction_model_by_id: Record<number, Model>;
  user_models: UserModel[];
  user_model_groups: UserModelGroup[];
}

const MyCollectionFaction = (props: Props) => {
  let numByStatus = countByStatus(props.user_models);
  if (props.user_models.length === 0) numByStatus = { unassembled: 1, assembled: 0, in_progress: 0, finished: 0 };

  const valueByLabel = {
    'Models': props.user_models.reduce((acc, um) => (
      acc + um.qty_unassembled + um.qty_assembled + um.qty_in_progress + um.qty_finished
    ), 0),
    'Complete': Math.round((numByStatus['finished'] / Object.values(numByStatus).reduce((acc, num) => acc + num, 0) * 100)) + '%'
  }

  const userModelsByGroupId: Record<number, UserModel[]> = props.user_models.reduce((acc: Record<number, UserModel[]>, um) => {
    const groupId = um.user_model_group_id;
    if (!(groupId in acc)) acc[groupId] = [];
    acc[groupId].push(um);
    return acc;
  }, {});

  const userModelsUngrouped = props.user_models.filter((um) => !um.user_model_group_id);
  
  return (
    <>
      <div className='px-6 py-8 max-w-[600px] mx-auto'>
        <div className='flex'>
          <div className='flex-1'>
            <a href='/my_collection'>
              <FontAwesomeIcon icon={byPrefixAndName.fas['left']} className='mr-1' />
              My Collection
            </a>
          </div>
          <div className='flex-1'>
            <h2 className='text-2xl text-center mb-5'>My {props.faction.name}</h2>
          </div>
          <div className='flex-1'></div>
        </div>
        
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

        <AddUserModelModal
          faction={props.faction}
          factionModels={Object.values(props.faction_model_by_id)}
          userModels={props.user_models} />

        {props.user_model_groups
          .map((group: UserModelGroup) => (
            <Fragment key={group.id}>
              <UserModelGroupDisplay
                userModelGroup={group}
                userModels={userModelsByGroupId[group.id]}
                factionModelById={props.faction_model_by_id} />
            </Fragment>
          ))}

        {userModelsUngrouped.length > 0 &&
          <UserModelGroupDisplay
            userModelGroup={undefined}
            userModels={userModelsUngrouped}
            factionModelById={props.faction_model_by_id} />
        }
      </div>
    </>
  );
};

export default MyCollectionFaction;
