import React, { useState } from "react";
import { Faction, Model, User, UserFaction, UserImage, UserModel, UserModelGroup, UserImageAssociation } from "../types/models";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import UserModelGallery from "./UserModelGallery";
import EditUserModel from "./EditUserModel";
import EditUserModelStatus from "./EditUserModelStatus";
import UserModelNotes from "./UserModelNotes";
import TabsBar from "../common/TabsBar";

type Props = {
  is_current_user: boolean;
  user: User;
  faction: Faction;
  user_faction: UserFaction;
  model: Model;
  user_model: UserModel;
  user_model_groups: UserModelGroup[];
  user_images: UserImage[];
  user_image_associations: UserImageAssociation[];
}

const CollectionUserModel = (props: Props) => {
  const urlParams = new URLSearchParams(document.location.search);

  const restrictedModes = ['edit'];
  const urlParamMode = urlParams.get('mode');

  const [mode, setMode] = useState<string>(
    props.is_current_user ?
      (urlParamMode || 'status') :
      (urlParamMode && !restrictedModes.includes(urlParamMode) ? urlParamMode : 'status')
  );

  return (
    <div className='px-6 py-8 max-w-[600px] mx-auto'>
      <div className='text-left mb-3'>
        <a href={'/user-factions/'+props.user_faction.id}>
          <FontAwesomeIcon icon={byPrefixAndName.fas['left']} className='mr-1' />
          {props.is_current_user ?
            'My ' :
            (props.user.display_name || props.user.username)+"'s "}
          {props.faction.name}
        </a>
      </div>
      <h2 className='text-center mb-5'>
        {props.user_model.name &&
          <div>
            <div className='text-2xl mb-1'>
              {props.user_model.name}
            </div>
            <div className='text-xl text-gray-400 italic'>
              {props.model.name}
            </div>
          </div>
        }
        {!props.user_model.name &&
          <div className='text-2xl'>
            {props.model.name}
          </div>
        }
      </h2>

      <TabsBar
        tabs={[
          { value: 'status', label: 'Status', icon: 'paintbrush-fine' },
          { value: 'notes', label: 'Notes', icon: 'book' },
          { value: 'gallery', label: 'Gallery', icon: 'camera', iconBadgeNumber: props.user_image_associations.length },
          { value: 'edit', label: 'Edit', icon: 'gear' }
        ].filter((tab) => (
          props.is_current_user || !restrictedModes.includes(tab.value)
        ))}
        initialTab={mode}
        onTabClicked={(tabValue: string) => setMode(tabValue)} />

      <div className='mt-2'>
        {mode === 'status' &&
          <EditUserModelStatus
            isCurrentUser={props.is_current_user}
            faction={props.faction}
            model={props.model}
            userModel={props.user_model} />
        }

        {mode === 'notes' &&
          <UserModelNotes
            isCurrentUser={props.is_current_user}
            userModel={props.user_model} />
        }

        {mode === 'gallery' &&
          <UserModelGallery
            isCurrentUser={props.is_current_user}
            userModel={props.user_model}
            userImages={props.user_images}
            userImageAssociations={props.user_image_associations} />
        }

        {mode === 'edit' &&
          <EditUserModel
            faction={props.faction}
            userFaction={props.user_faction}
            model={props.model}
            userModel={props.user_model}
            userModelGroups={props.user_model_groups} />
        }
      </div>
    </div>
  );
};

export default CollectionUserModel;
