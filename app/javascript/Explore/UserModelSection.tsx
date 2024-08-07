import React from "react";
import { Model, User, UserModel, UserModelImageAssociation } from "../types/models";
import UserModelSectionItem from "./UserModelSectionItem";
import CollapsibleListSection from "../common/CollapsibleListSection";

type Props = {
  user: User;
  model: Model;
  userModels: UserModel[];
  userModelImageAssociationsByUserModelId: Record<number, UserModelImageAssociation[]>;
  className?: string;
};

const UserModelSection = (props: Props) => {
  return (
    <CollapsibleListSection
      id={'user-model-section-'+props.user.id}
      headerText={props.user.display_name || props.user.username}
      className='mt-5'>

      {props.userModels.length === 0 &&
        <div className='text-xl text-center my-5'>
          No Models
        </div>
      }
      {props.userModels.map((userModel: UserModel) => (
        <UserModelSectionItem
          key={userModel.id}
          model={props.model}
          userModel={userModel}
          userModelImageAssociations={props.userModelImageAssociationsByUserModelId[userModel.id] || []}
          className={'mb-5'} />
      ))}
    </CollapsibleListSection>
  );
};

export default UserModelSection;
