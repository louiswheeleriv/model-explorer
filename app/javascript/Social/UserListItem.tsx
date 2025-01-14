import React from "react";
import { UserData } from "../types/models";
import StatusColorBar from "../common/StatusColorBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import ProfilePicture from "../common/ProfilePicture";

type Props = {
  userData: UserData;
  className?: string;
};

const UserListItem = (props: Props) => {
  function redirectToUserPage() {
    window.location.assign('/users/'+props.userData.user.id);
  }

  return (
    <div className={props.className}>
      <div className='px-3 py-2 bg-[#607499] rounded-t-md flex cursor-pointer align-middle' onClick={redirectToUserPage}>
        <div className='flex-none my-auto'>
          <ProfilePicture
            width='50px'
            imageUrl={props.userData.user.profile_picture_url}
            className='mr-3' />
        </div>
        <div className='flex-1 text-left my-auto text-xl'>
          {props.userData.user.display_name || props.userData.user.username}
        </div>
        <div className='flex-none my-auto text-right'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['chevron-right']} />
        </div>
      </div>
      <StatusColorBar numByStatus={props.userData.model_num_by_status} rounding='bottom' size='small' />
    </div>
  );
};

export default UserListItem;
