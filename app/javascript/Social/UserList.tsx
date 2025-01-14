import React from "react";
import { UserData } from "../types/models";
import UserListItem from "./UserListItem";

type Props = {
  users: UserData[];
};

const UserList = (props: Props) => {
  return (
    <>
      {props.users.map((userData) => (
        <UserListItem
          key={userData.user.id}
          userData={userData}
          className='mb-3' />
      ))}
    </>
  );
};

export default UserList;
