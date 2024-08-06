import React from "react";
import { Faction, Model, UserFaction, UserModel, UserModelImageAssociation } from "../types/models";
import StatusColorBar from "../common/StatusColorBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import { countByStatus } from "../utils/helpers";

type Props = {
  faction: Faction;
  userFaction: UserFaction;
  model: Model;
  userModel: UserModel;
  userModelImageAssociations: UserModelImageAssociation[];
  startExpanded?: boolean;
  className?: string;
}

const UserModelProgressBar = (props: Props) => {
  const numByStatus = countByStatus([props.userModel]);
  const totalQuantity = Object.values(numByStatus).reduce((acc, num) => acc + num, 0);
  const userModelDisplayName = props.userModel.name ? props.userModel.name+' ('+props.model.name+')' : props.model.name;
  const componentId = 'user-model-' + props.userModel.id;

  return (
    <div className={props.className} id={componentId}>
      <a href={'/user-models/'+props.userModel.id}
        className='p-4 bg-[#607499] rounded-t-md flex cursor-pointer items-center'>

        <div className='flex-1 items-start'>
          <div>{userModelDisplayName}</div>
          <div className='pl-3 flex'>
            <div className='flex-none'>
              <FontAwesomeIcon icon={byPrefixAndName.fas['chess-knight']} className='mr-2' />
              {totalQuantity}
            </div>
            {props.userModelImageAssociations.length > 0 &&
              <div className='flex-none ml-3'>
                <FontAwesomeIcon icon={byPrefixAndName.fas['camera']} className='mr-2' />
                {props.userModelImageAssociations.length}
              </div>
            }
          </div>
        </div>
        <div className='flex-none text-end'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['chevron-right']} />
        </div>
      </a>

      <StatusColorBar numByStatus={numByStatus} rounding='bottom' size='small' />
    </div>
  );
};

export default UserModelProgressBar;
