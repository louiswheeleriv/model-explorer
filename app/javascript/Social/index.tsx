import React from "react";
import { QuantityByStatus, User, UserImage } from "../types/models";
import UserList from "./UserList";

type Props = {
  users: User[];
  profile_picture_by_user_id: Record<number, UserImage>;
  num_by_status_by_user_id: Record<number, QuantityByStatus>;
};

const Social = (props: Props) => {
  return (
    <div id='social-index' className='px-6 py-8 max-w-[600px] mx-auto'>
      <div className='text-2xl text-center mb-5'>
        Social
      </div>

      <UserList
        users={props.users}
        profilePictureByUserId={props.profile_picture_by_user_id}
        numByStatusByUserId={props.num_by_status_by_user_id} />
    </div>
  );
};

export default Social;
