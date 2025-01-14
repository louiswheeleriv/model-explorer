import React, { useEffect, useState } from "react";
import { QuantityByStatus, User, UserData, UserImage } from "../types/models";
import UserList from "./UserList";
import { apiCall } from "../utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";
import Button from "../common/Button";
import Select from "../common/Select";
import Input from "../common/Input";

type UserFilter = 'all' | 'following' | 'followers';
type UserFeedState = {
  filter: UserFilter;
  search: string;
  page: number;
}

type Props = {
  users: User[];
  profile_picture_by_user_id: Record<number, UserImage>;
  num_by_status_by_user_id: Record<number, QuantityByStatus>;
};

const Users = (props: Props) => {
  const [userFeedState, setUserFeedState] = useState<UserFeedState>({ filter: 'all', search: '', page: 1 });
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [noMoreUsers, setNoMoreUsers] = useState(false);

  const [users, setUsers] = useState<UserData[]>([]);
  
  const usersPerPage = 20;

  useEffect(() => {
    (async () => {
      setIsLoadingUsers(true);
      const newUsers = await getUsers(userFeedState.page, userFeedState.filter, userFeedState.search);
      if (userFeedState.page === 1) {
        setUsers(newUsers);
      } else {
        setUsers(users.concat(newUsers));
      }
      setNoMoreUsers(newUsers.length < usersPerPage);
      setIsLoadingUsers(false);
    })();
  }, [userFeedState]);

  function handleUserFilterChanged(filter: UserFilter) {
    setUserFeedState({ ...userFeedState, filter: filter, page: 1 });
  }

  function handleUserSearchChanged(search: string) {
    setUserFeedState({ ...userFeedState, search: search, page: 1 })
  }

  function getUsers(page: number, filter: UserFilter, search: string): Promise<UserData[]> {
    return apiCall({
      method: 'GET',
      endpoint: '/api/users',
      urlParams: {
        per_page: usersPerPage,
        page: page,
        filter: filter,
        search: search
      }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error);
        return body.users;
      });
  }

  return (
    <div className='px-6 py-8 max-w-[600px] mx-auto text-center'>
      <div className='text-2xl text-center mb-5'>
        Users
      </div>

      <div className='flex space-x-3 mb-3'>
        <div className='flex-none'>
          <Select
            value={userFeedState.filter}
            onChange={(e) => handleUserFilterChanged(e.target.value as UserFilter)}
            className='max-w-[200px]'>
              <option value='all'>All Users</option>
              <option value='following'>Following</option>
              <option value='followers'>Followers</option>
          </Select>
        </div>
        <div className='flex-1'>
          <Input
            value={userFeedState.search}
            onChange={(e) => handleUserSearchChanged(e.target.value)}
            placeholder='Search'
            className='w-full' />
        </div>
      </div>
      
      <UserList users={users} />

      {users.length === 0 &&
        <div className='text-lg italic text-gray-500'>
          No users
        </div>
      }

      {isLoadingUsers &&
        <FontAwesomeIcon
          icon={byPrefixAndName.fas['circle-notch']}
          className='my-3 fa-2x fa-spin' />
      }

      {!isLoadingUsers && !noMoreUsers &&
        <Button
          onClick={() => setUserFeedState({ ...userFeedState, page: userFeedState.page + 1 })}>
          Load More
        </Button>
      }
    </div>
  );
};

export default Users;
