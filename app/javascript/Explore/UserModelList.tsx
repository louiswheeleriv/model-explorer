import React, { useEffect, useState } from "react";
import { Faction, Model, User, UserModel, UserModelImageAssociation } from "../types/models";
import Input from "../common/Input";
import ModelListItem from "./ModelListItem";
import UserModelSection from "./UserModelSection";

type Props = {
  faction: Faction;
  model: Model;
  users: User[];
  userModels: UserModel[];
  userModelImageAssociationsByUserModelId: Record<number, UserModelImageAssociation[]>;
};

type UserModelSectionData = {
  user: User;
  userModels: UserModel[];
};

const UserModelList = (props: Props) => {
  const userModelsByUserId: Record<number, UserModel[]> =
    props.userModels.reduce((acc: Record<number, UserModel[]>, um: UserModel) => {
      if (!acc[um.user_id]) acc[um.user_id] = [];
      acc[um.user_id].push(um);
      return acc;
    }, {});

  const userModelSections: UserModelSectionData[] =
    props.users.sort((a, b) => {
      const aName = a.display_name || a.username;
      const bName = b.display_name || b.username;
      if (aName < bName) return -1;
      if (aName > bName) return 1;
      return 0;
    }).map((user) => ({
      user: user,
      userModels: userModelsByUserId[user.id]
    }));

  const [filteredUserModelSections, setFilteredUserModelSections] = useState<UserModelSectionData[]>(userModelSections);
  const [filterString, setFilterString] = useState('');

  useEffect(() => {
    setFilteredUserModelSections(
      userModelSections.filter((section) => (
        (section.user.display_name && section.user.display_name.toLowerCase().includes(filterString)) ||
          section.user.username.toLowerCase().includes(filterString) ||
          section.userModels.find((userModel) => (
            userModel.name && userModel.name.toLowerCase().includes(filterString)
          ))
      ))
    );
  }, [filterString]);

  return (
    <div id='explore-user-models'>
      <Input
        onChange={(e) => setFilterString(e.target.value.toLowerCase())}
        placeholder='Search'
        className='mb-3' />

      <div className='overscroll-contain'>
        {filteredUserModelSections.map((section) => (
          <UserModelSection
            key={section.user.id}
            user={section.user}
            model={props.model}
            userModels={section.userModels}
            userModelImageAssociationsByUserModelId={props.userModelImageAssociationsByUserModelId}
            className='mb-3' />
        ))}
      </div>
    </div>
  );
};

export default UserModelList;
