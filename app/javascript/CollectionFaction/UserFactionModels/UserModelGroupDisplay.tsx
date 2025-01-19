import React from "react";
import { Faction, Model, UserFaction, UserModel, UserModelGroup, UserImageAssociation } from "../../types/models";
import UserModelProgressBar from "./UserModelProgressBar";
import CollapsibleListSection from "../../common/CollapsibleListSection";

type Props = {
  faction: Faction;
  userFaction: UserFaction;
  userModelGroup?: UserModelGroup;
  userModels: UserModel[];
  userImageAssociationsByUserModelId: Record<number, UserImageAssociation[]>;
  factionModelById: Record<number, Model>;
  startExpanded?: boolean;
  className?: string;
}

const UserModelGroupDisplay = (props: Props) => {
  return (
    <CollapsibleListSection
      id={props.userModelGroup?.id || 'ungrouped'}
      headerText={props.userModelGroup ? props.userModelGroup.name : 'Ungrouped'}
      className='mt-5'>
    
      {props.userModels.length === 0 &&
        <div className='text-xl text-center my-5 italic text-gray-500'>
          No Models
        </div>
      }

      {props.userModels
        .sort((a, b) => {
          const aName = a.name || props.factionModelById[a.model_id].name;
          const bName = b.name || props.factionModelById[b.model_id].name;
          if (aName < bName) return -1;
          if (aName > bName) return 1;
          return 0;
        })
        .map((userModel: UserModel) => (
          <UserModelProgressBar
            key={userModel.id}
            userModel={userModel}
            modelName={props.factionModelById[userModel.model_id].name}
            numImages={props.userImageAssociationsByUserModelId[userModel.id]?.length}
            isClickable={true}
            className={'mb-5'} />
        ))}
    </CollapsibleListSection>
  );
};

export default UserModelGroupDisplay;
