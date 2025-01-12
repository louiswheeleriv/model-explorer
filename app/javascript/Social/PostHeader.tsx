import React from "react";
import ProfilePicture from "../common/ProfilePicture";
import { friendlyDateTimeString } from "../utils/helpers";

type Props = {
  userId: number;
  userDisplayName: string;
  userProfilePictureUrl?: string;
  timestamp?: string;
  className?: string;
};

const PostHeader = (props: Props) => {
  return (
    <div className='flex mb-2'>
      <ProfilePicture
        width='40px'
        imageUrl={props.userProfilePictureUrl}
        onClick={() => window.location.assign('/users/'+props.userId)}
        className='flex-none cursor-pointer' />
      <div className='flex-1 text-left ml-2'>
        <b
          onClick={() => window.location.assign('/users/'+props.userId)}
          className='cursor-pointer'>
            {props.userDisplayName}
        </b>
        {props.timestamp &&
          <div className='text-xs text-gray-300'>{friendlyDateTimeString(props.timestamp)}</div>
        }
      </div>
    </div>
  );
};

export default PostHeader;
