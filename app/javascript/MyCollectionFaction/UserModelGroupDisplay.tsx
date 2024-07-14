import React, { Fragment} from "react";
import { Model, UserModel, UserModelGroup } from "../types/models";
import UserModelProgressBar from "./UserModelProgressBar";

type Props = {
  userModelGroup?: UserModelGroup;
  userModels: UserModel[];
  factionModelById: Record<number, Model>;
  className?: string;
}

const UserModelGroupDisplay = (props: Props) => {
  const componentId = 'user-model-group-' + props.userModelGroup?.id;

  return (
    <div className={props.className} id={componentId}>
      <div className='group-name my-5 text-xl'>
        {props.userModelGroup ? props.userModelGroup.name : 'Ungrouped'}
      </div>
      <div>
        {props.userModels
          .sort((a, b) => {
            const aName = a.name || props.factionModelById[a.model_id].name;
            const bName = b.name || props.factionModelById[b.model_id].name;
            if (aName < bName) return -1;
            if (aName > bName) return 1;
            return 0;
          })
          .map((userModel: UserModel) => (
            <Fragment key={userModel.id}>
              <UserModelProgressBar
                model={props.factionModelById[userModel.model_id]}
                userModel={userModel}
                className={'mb-5'} />
            </Fragment>
          ))}
      </div>
    </div>
  );
};

export default UserModelGroupDisplay;
