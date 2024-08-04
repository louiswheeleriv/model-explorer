import React, { useEffect, useState } from "react";
import { Model, User, UserModel } from "../types/models";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import UserModelSectionItem from "./UserModelSectionItem";
import $ from 'jquery';

type Props = {
  user: User;
  model: Model;
  userModels: UserModel[];
  className?: string;
};

const UserModelSection = (props: Props) => {
  const [isExpanded, setIsExpanded] = useState(true);

  function redirectToUserModelPage(userModel: UserModel) {
    window.location.assign('/user-models/'+userModel.id);
  }

  useEffect(() => {
    const itemHeight = 120;
    const maxHeight = isExpanded ? (itemHeight * props.userModels.length) + 'px' : 0;
    const angle = isExpanded ? 90 : 0;
    $('#'+componentId+' .models').css({
      'max-height': maxHeight
    });
    $('#'+componentId+' .group-collapse-icon').css({ 'transform': 'rotate('+angle+'deg)' });
  }, [isExpanded]);

  const componentId = 'user-model-section-'+props.user.id;

  return (
    <div className={props.className} id={componentId}>
      <div className='group-name my-5 text-xl cursor-pointer' onClick={() => setIsExpanded(!isExpanded)}>
        <FontAwesomeIcon
          icon={byPrefixAndName.fas['chevron-right']}
          className='group-collapse-icon transition-transform duration-300 mr-3' />
        {props.user.display_name || props.user.username}
      </div>
      <div className='overflow-hidden'>
        <div className='models transition-[max-height] ease-in-out duration-500'>
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
              className={'mb-5'} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserModelSection;
