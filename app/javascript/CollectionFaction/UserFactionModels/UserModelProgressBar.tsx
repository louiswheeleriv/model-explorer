import React from "react";
import { UserModel } from "../../types/models";
import StatusColorBar from "../../common/StatusColorBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import { countByStatus } from "../../utils/helpers";

type Props = {
  userModel: UserModel;
  modelName: string;
  numImages?: number;
  isClickable?: boolean;
  className?: string;
}

const UserModelProgressBar = (props: Props) => {
  const numByStatus = countByStatus([props.userModel]);
  const totalQuantity = Object.values(numByStatus).reduce((acc, num) => acc + num, 0);
  const userModelDisplayName = props.userModel.name ? props.userModel.name+' ('+props.modelName+')' : props.modelName;
  const componentId = 'user-model-' + props.userModel.id;

  function handleClicked() {
    if (!props.isClickable) return;

    window.location.href = '/user-models/'+props.userModel.id;
  }

  return (
    <div className={props.className} id={componentId}>
      <div
        onClick={handleClicked}
        className={'p-4 bg-[#607499] rounded-t-md flex items-center'+(props.isClickable ? ' cursor-pointer' : '')}>

        <div className='flex-1 text-left'>
          <div>{userModelDisplayName}</div>
          <div className='pl-3 flex'>
            <div className='flex-none'>
              <FontAwesomeIcon icon={byPrefixAndName.fas['chess-knight']} className='mr-2' />
              {totalQuantity}
            </div>
            {props.numImages && props.numImages > 0 &&
              <div className='flex-none ml-3'>
                <FontAwesomeIcon icon={byPrefixAndName.fas['camera']} className='mr-2' />
                {props.numImages}
              </div>
            }
          </div>
        </div>
        {props.isClickable &&
          <div className='flex-none text-end'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['chevron-right']} />
          </div>
        }
      </div>

      <StatusColorBar numByStatus={numByStatus} rounding='bottom' size='small' />
    </div>
  );
};

export default UserModelProgressBar;
