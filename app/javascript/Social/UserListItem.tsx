import React from "react";
import { QuantityByStatus, User, UserImage } from "../types/models";
import StatusColorBar from "../common/StatusColorBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import ProfilePicture from "../common/ProfilePicture";

type Props = {
  user: User;
  profilePicture?: UserImage;
  numByStatus: QuantityByStatus;
  className?: string;
};

const UserListItem = (props: Props) => {
  function redirectToUserPage() {
    // window.location.assign('/my-collection/user-factions/'+props.userFaction.id);
  }

  return (
    <div className={props.className}>
      <div className='px-3 py-2 bg-[#607499] rounded-t-md flex cursor-pointer align-middle' onClick={redirectToUserPage}>
        <div className='flex-none my-auto'>
          <ProfilePicture
            width='50px'
            imageUrl={props.profilePicture?.url}
            className='mr-3' />
        </div>
        <div className='flex-1 my-auto text-xl'>
          {props.user.display_name || props.user.username}
        </div>
        <div className='flex-1 my-auto text-right'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['chevron-right']} />
        </div>
      </div>
      <StatusColorBar numByStatus={props.numByStatus} rounding='bottom' size='small' />
    </div>
  );
};

export default UserListItem;
