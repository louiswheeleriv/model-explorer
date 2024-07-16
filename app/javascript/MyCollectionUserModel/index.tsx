import React, { useState } from "react";
import { Faction, Model, UserFaction, UserImage, UserModel, UserModelGroup } from "../types/models";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import UserModelGallery from "./UserModelGallery";
import EditUserModel from "./EditUserModel";
import EditUserModelStatus from "./EditUserModelStatus";

type Props = {
  faction: Faction;
  user_faction: UserFaction;
  model: Model;
  user_model: UserModel;
  user_model_groups: UserModelGroup[];
  user_images: UserImage[];
}

type Mode = 'status' | 'gallery' | 'notes' | 'edit';

const MyCollectionUserModel = (props: Props) => {
  const [mode, setMode] = useState<Mode>('status');
  const userModelDisplayName = props.user_model.name ? props.user_model.name+' ('+props.model.name+')' : props.model.name;

  return (
    <div className='px-6 py-8 max-w-[600px] mx-auto'>
      <div className='flex'>
        <div className='flex-1'>
          <a href={'/my_collection/'+props.faction.name}>
            <FontAwesomeIcon icon={byPrefixAndName.fas['left']} className='mr-1' />
            {props.faction.name}
          </a>
        </div>
        <div className='flex-1'>
          <h2 className='text-2xl text-center mb-5'>{userModelDisplayName}</h2>
        </div>
        <div className='flex-1'></div>
      </div>

      <div className='flex mt-3'>
        <div onClick={() => setMode('status')}
          className={'flex-1 cursor-pointer text-center p-3'+(mode === 'status' ? ' border-b text-lg font-semibold' : '')}>
            <FontAwesomeIcon icon={byPrefixAndName.fas['paintbrush-fine']} size='lg' />
            <span className='hidden sm:inline sm:ml-2'>Status</span>
        </div>
        <div onClick={() => setMode('gallery')}
          className={'flex-1 cursor-pointer text-center p-3'+(mode === 'gallery' ? ' border-b text-lg font-semibold' : '')}>
            <FontAwesomeIcon icon={byPrefixAndName.fas['camera']} size='lg' />
            <span className='hidden sm:inline sm:ml-2'>Gallery</span>
        </div>
        <div onClick={() => setMode('notes')}
          className={'flex-1 cursor-pointer text-center p-3'+(mode === 'notes' ? ' border-b text-lg font-semibold' : '')}>
            <FontAwesomeIcon icon={byPrefixAndName.fas['book']} size='lg' />
            <span className='hidden sm:inline sm:ml-2'>Notes</span>
        </div>
        <div onClick={() => setMode('edit')}
          className={'flex-1 cursor-pointer text-center p-3'+(mode === 'edit' ? ' border-b text-lg font-semibold' : '')}>
            <FontAwesomeIcon icon={byPrefixAndName.fas['gear']} size='lg' />
            <span className='hidden sm:inline sm:ml-2'>Edit</span>
        </div>
      </div>

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
            userImages={props.user_images} />
        }

        {mode === 'notes' &&
          <div className='mh-[400px] text-center align-middle'>
            NOTES
          </div>
        }

        {mode === 'edit' &&
          <EditUserModel
            faction={props.faction}
            model={props.model}
            userModel={props.user_model}
            userModelGroups={props.user_model_groups} />
        }
      </div>
    </div>
  );
};

export default MyCollectionUserModel;
