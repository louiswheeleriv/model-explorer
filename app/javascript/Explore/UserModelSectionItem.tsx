import React from "react";
import { Model, UserModel } from "../types/models";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import { countByStatus } from "../utils/helpers";
import StatusColorBar from "../common/StatusColorBar";

type Props = {
  model: Model;
  userModel: UserModel;
  className?: string;
};

const UserModelSectionItem = (props: Props) => {
  const numByStatus = countByStatus([props.userModel]);
  const totalCount = numByStatus.unassembled + numByStatus.assembled + numByStatus.in_progress + numByStatus.finished;

  function redirectToUserModelPage() {
    window.location.assign('/user-models/'+props.userModel.id);
  }

  return (
    <div className={props.className}>
      <div className='px-3 py-2 bg-[#607499] rounded-t-md flex cursor-pointer align-middle' onClick={redirectToUserModelPage}>
        <div className='flex-1 my-auto text-lg'>
          {props.userModel.name || props.model.name}
          <div className='ml-5'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['chess-knight']} className='mr-2' />
            Count: {totalCount}
          </div>
        </div>
        <div className='flex-1 my-auto text-right'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['chevron-right']} />
        </div>
      </div>
      <StatusColorBar numByStatus={numByStatus} rounding='bottom' size='small' />
    </div>
  );
};

export default UserModelSectionItem;
