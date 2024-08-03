import React, { useState } from "react";
import { Faction, Model, UserFaction, UserImage, UserModel, UserModelGroup, UserModelImageAssociation } from "../types/models";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import UserModelGallery from "./UserModelGallery";
import EditUserModel from "./EditUserModel";
import EditUserModelStatus from "./EditUserModelStatus";
import UserModelNotes from "./UserModelNotes";
import TabsBar from "../common/TabsBar";

type Props = {
  faction: Faction;
  user_faction: UserFaction;
  model: Model;
  user_model: UserModel;
  user_model_groups: UserModelGroup[];
  user_images: UserImage[];
  user_model_image_associations: UserModelImageAssociation[];
}

const MyCollectionUserModel = (props: Props) => {
  const urlParams = new URLSearchParams(document.location.search);

  const [mode, setMode] = useState<string>(urlParams.get('mode') || 'status');
  const userModelDisplayName = props.user_model.name ? props.user_model.name+' ('+props.model.name+')' : props.model.name;

  return (
    <div className='px-6 py-8 max-w-[600px] mx-auto'>
      <div className='flex'>
        <div className='flex-1'>
          <a href={'/my-collection/user-factions/'+props.user_faction.id}>
            <FontAwesomeIcon icon={byPrefixAndName.fas['left']} className='mr-1' />
            {props.faction.name}
          </a>
        </div>
        <div className='flex-1'>
          <h2 className='text-2xl text-center mb-5'>{userModelDisplayName}</h2>
        </div>
        <div className='flex-1'></div>
      </div>

      <TabsBar
        tabs={[
          { value: 'status', label: 'Status', icon: 'paintbrush-fine' },
          { value: 'gallery', label: 'Gallery', icon: 'camera' },
          { value: 'notes', label: 'Notes', icon: 'book' },
          { value: 'edit', label: 'Edit', icon: 'gear' }
        ]}
        initialTab={mode}
        onTabClicked={(tabValue: string) => setMode(tabValue)} />

      <div className='mt-2'>
        {mode === 'status' &&
          <EditUserModelStatus
            faction={props.faction}
            model={props.model}
            userModel={props.user_model} />
        }

        {mode === 'gallery' &&
          <UserModelGallery
            userModel={props.user_model}
            userImages={props.user_images}
            userModelImageAssociations={props.user_model_image_associations} />
        }

        {mode === 'notes' &&
          <UserModelNotes
            userModel={props.user_model} />
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

export default MyCollectionUserModel;
