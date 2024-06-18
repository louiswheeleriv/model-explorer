import React, { Fragment } from "react";
import { Faction, Model, UserModel } from "../types/models";
import SummaryProgressBar from "../common/SummaryProgressBar";
import UserModelProgressBar from "./UserModelProgressBar";
import Button from "../common/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import { countByStatus } from "../utils/helpers";
import AddUserModelModal, { openAddUserModelModal } from "./AddUserModelModal";

type Props = {
  faction: Faction;
  faction_model_by_id: Record<number, Model>;
  user_models_by_model_id: Record<number, UserModel[]>;
}

const MyCollectionFaction = (props: Props) => {
  const userModels = Object.values(props.user_models_by_model_id).flat()
  let numByStatus = countByStatus(userModels);
  if (userModels.length === 0) numByStatus = { 'unassembled': 1, 'finished': 0 };

  const valueByLabel = {
    'Models': userModels.reduce((acc, um) => (acc + um.quantity), 0),
    'Complete': Math.round((numByStatus['finished'] / Object.values(numByStatus).reduce((acc, num) => acc + num, 0) * 100)) + '%'
  }
  
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

        <div className='flex items-center'>
          <div className='my-5 text-xl'>
            Models
          </div>
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
          userModels={userModels} />

        {Object.keys(props.user_models_by_model_id).map((modelId: string) => (
          <Fragment key={modelId}>
            <UserModelProgressBar
              model={props.faction_model_by_id[Number(modelId)]}
              userModels={props.user_models_by_model_id[Number(modelId)]}
              className={'mb-5'} />
          </Fragment>
        ))}

      </div>
    </>
  );
};

export default MyCollectionFaction;
