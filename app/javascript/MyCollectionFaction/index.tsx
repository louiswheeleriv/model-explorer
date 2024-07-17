import React, { useState } from "react";
import { Faction, Model, UserModel, UserModelGroup } from "../types/models";
import SummaryProgressBar from "../common/SummaryProgressBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import { countByStatus } from "../utils/helpers";
import ManageUserModels from "./ManageUserModels";
import ManageUserModelGroups from "./ManageUserModelGroups";

type Props = {
  faction: Faction;
  faction_model_by_id: Record<number, Model>;
  user_models: UserModel[];
  user_model_groups: UserModelGroup[];
}

const MyCollectionFaction = (props: Props) => {
  const [mode, setMode] = useState('models');

  let numByStatus = countByStatus(props.user_models);
  if (props.user_models.length === 0) numByStatus = { unassembled: 1, assembled: 0, in_progress: 0, finished: 0 };

  const valueByLabel = {
    'Models': props.user_models.reduce((acc, um) => (
      acc + um.qty_unassembled + um.qty_assembled + um.qty_in_progress + um.qty_finished
    ), 0),
    'Complete': Math.round((numByStatus['finished'] / Object.values(numByStatus).reduce((acc, num) => acc + num, 0) * 100)) + '%'
  }

  function switchToManageGroupsView() { setMode('groups') }
  function switchToModelsView() { location.reload() }

  return (
    <div className='px-6 py-8 max-w-[600px] mx-auto'>
      <div className='flex'>
        <div className='flex-1'>
          <a href='/my-collection'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['left']} className='mr-1' />
            My Collection
          </a>
        </div>
        <div className='flex-1'>
          <h2 className='text-2xl text-center mb-5'>{props.faction.name}</h2>
        </div>
        <div className='flex-1'></div>
      </div>
      
      <SummaryProgressBar
        numByStatus={numByStatus}
        valueByLabel={valueByLabel}
      />

      {mode === 'models' &&
        <ManageUserModels
          faction={props.faction}
          userModels={props.user_models}
          userModelGroups={props.user_model_groups}
          factionModelById={props.faction_model_by_id}
          onManageGroupsButtonClick={switchToManageGroupsView} />
      }
      {mode === 'groups' &&
        <ManageUserModelGroups
          faction={props.faction}
          userModelGroups={props.user_model_groups}
          afterSave={switchToModelsView}
        />
      }
    </div>
  );
};

export default MyCollectionFaction;
