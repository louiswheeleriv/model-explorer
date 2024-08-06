import React from "react";
import { Model, UserModel, UserModelImageAssociation } from "../types/models";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import { countByStatus } from "../utils/helpers";
import StatusColorBar from "../common/StatusColorBar";

type Props = {
  model: Model;
  userModel: UserModel;
  userModelImageAssociations: UserModelImageAssociation[];
  className?: string;
};

const UserModelSectionItem = (props: Props) => {
  const numByStatus = countByStatus([props.userModel]);
  const totalQuantity = numByStatus.unassembled + numByStatus.assembled + numByStatus.in_progress + numByStatus.finished;

  function redirectToUserModelPage() {
    window.location.assign('/user-models/'+props.userModel.id);
  }

  return (
    <div className={props.className}>
      <div className='px-3 py-2 bg-[#607499] rounded-t-md flex cursor-pointer align-middle' onClick={redirectToUserModelPage}>
        <div className='flex-1 my-auto text-lg'>
          <div>{props.userModel.name || props.model.name}</div>
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
        <div className='flex-none my-auto text-right'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['chevron-right']} />
        </div>
      </div>
      <StatusColorBar numByStatus={numByStatus} rounding='bottom' size='small' />
    </div>
  );
};

export default UserModelSectionItem;
