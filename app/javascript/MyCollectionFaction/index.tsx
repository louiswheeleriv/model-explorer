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
  user_models: UserModel[];
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
          userModels={props.user_models} />

        {props.user_models.map((userModel: UserModel) => (
          <Fragment key={userModel.id}>
            <UserModelProgressBar
              model={props.faction_model_by_id[userModel.model_id]}
              userModel={userModel}
              className={'mb-5'} />
          </Fragment>
        ))}

      </div>
    </>
  );
};

export default MyCollectionFaction;
