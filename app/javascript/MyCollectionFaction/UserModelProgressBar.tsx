import React from "react";
import { Faction, Model, UserModel } from "../types/models";
import StatusColorBar from "../common/StatusColorBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import { countByStatus } from "../utils/helpers";

type Props = {
  faction: Faction;
  model: Model;
  userModel: UserModel;
  startExpanded?: boolean;
  className?: string;
}

const UserModelProgressBar = (props: Props) => {
  const numByStatus = countByStatus([props.userModel]);
  const userModelDisplayName = props.userModel.name ? props.userModel.name+' ('+props.model.name+')' : props.model.name;
  const componentId = 'user-model-' + props.userModel.id;

  return (
    <div className={props.className} id={componentId}>
      <a href={'/my-collection/'+props.faction.name+'/user-models/'+props.userModel.id}
        className='p-4 bg-[#607499] rounded-t-md flex cursor-pointer items-center'>
          <div className='flex-1 items-start'>
            {userModelDisplayName}
          </div>
          <div className='flex-1 text-end'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['chevron-right']} />
          </div>
      </a>

      <StatusColorBar numByStatus={numByStatus} rounding='bottom' size='small' />
    </div>
  );
};

export default UserModelProgressBar;
