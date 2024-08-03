import React, { useEffect, useState } from "react";
import { QuantityByStatus, User, UserImage } from "../types/models";
import UserListItem from "./UserListItem";
import Input from "../common/Input";

type Props = {
  users: User[];
  profilePictureByUserId: Record<number, UserImage>;
  numByStatusByUserId: Record<number, QuantityByStatus>;
};

const UserList = (props: Props) => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>(props.users);
  const [filterString, setFilterString] = useState('');

  useEffect(() => {
    setFilteredUsers(
      props.users.filter((user) => {
        if (user.display_name) return user.display_name.toLowerCase().includes(filterString);
        return user.username.toLowerCase().includes(filterString);
      })
    );
  }, [filterString]);

  return (
    <div id='social-users overflow-hidden'>
      <Input
        onChange={(e) => setFilterString(e.target.value.toLowerCase())}
        placeholder='Search'
        className='mb-3' />

      <div className='h-[60vh] overflow-y-auto overscroll-contain'>
        {filteredUsers.map((user) => (
          <UserListItem
            key={user.id}
            user={user}
            profilePicture={props.profilePictureByUserId[user.id]}
            numByStatus={props.numByStatusByUserId[user.id]}
            className='mb-3' />
        ))}
      </div>
    </div>
  );
};

export default UserList;
