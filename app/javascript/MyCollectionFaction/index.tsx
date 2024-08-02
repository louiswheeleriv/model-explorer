import React, { useState } from "react";
import { Faction, GameSystem, Model, UserFaction, UserModel, UserModelGroup } from "../types/models";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import UserFactionModels from "./UserFactionModels";
import UserFactionGroups from "./UserFactionGroups";
import UserFactionGallery from "./UserFactionGallery";
import EditUserFaction from "./EditUserFaction";

type Props = {
  game_system: GameSystem;
  faction: Faction;
  user_faction: UserFaction;
  faction_model_by_id: Record<number, Model>;
  user_models: UserModel[];
  user_model_groups: UserModelGroup[];
}

const MyCollectionFaction = (props: Props) => {
  const [mode, setMode] = useState('models');

  function switchToManageGroupsView() { setMode('groups') }
  function switchToModelsView() { location.reload() }

  return (
    <div className='px-6 py-8 max-w-[600px] mx-auto'>
      <div className='flex'>
        <div className='flex-1'>
          <a href='/my-collection'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['left']} className='mr-1' />
            My Collection
          </a>
        </div>
        <div className='flex-1'>
          <h2 className='text-2xl text-center mb-5'>
            {props.user_faction.name ?
              props.user_faction.name+' ('+props.faction.name+')' :
              props.faction.name
            }
          </h2>
        </div>
        <div className='flex-1'></div>
      </div>

      <div className='flex mt-3'>
        <div onClick={() => setMode('models')}
          className={'flex-1 cursor-pointer text-center p-3'+(mode === 'models' ? ' border-b text-lg font-semibold' : '')}>
            <FontAwesomeIcon icon={byPrefixAndName.fas['chess-knight']} size='lg' />
            <span className='hidden sm:inline sm:ml-2'>Models</span>
        </div>
        <div onClick={() => setMode('groups')}
          className={'flex-1 cursor-pointer text-center p-3'+(mode === 'groups' ? ' border-b text-lg font-semibold' : '')}>
            <FontAwesomeIcon icon={byPrefixAndName.fas['layer-group']} size='lg' />
            <span className='hidden sm:inline sm:ml-2'>Groups</span>
        </div>
        <div onClick={() => setMode('gallery')}
          className={'flex-1 cursor-pointer text-center p-3'+(mode === 'gallery' ? ' border-b text-lg font-semibold' : '')}>
            <FontAwesomeIcon icon={byPrefixAndName.fas['camera']} size='lg' />
            <span className='hidden sm:inline sm:ml-2'>Gallery</span>
        </div>
        <div onClick={() => setMode('edit')}
          className={'flex-1 cursor-pointer text-center p-3'+(mode === 'edit' ? ' border-b text-lg font-semibold' : '')}>
            <FontAwesomeIcon icon={byPrefixAndName.fas['gear']} size='lg' />
            <span className='hidden sm:inline sm:ml-2'>Edit</span>
        </div>
      </div>

      <div className='mt-2'>
        {mode === 'models' &&
          <UserFactionModels
            faction={props.faction}
            userFaction={props.user_faction}
            userModels={props.user_models}
            userModelGroups={props.user_model_groups}
            factionModelById={props.faction_model_by_id}
            onManageGroupsButtonClick={switchToManageGroupsView} />
        }
        {mode === 'groups' &&
          <UserFactionGroups
            faction={props.faction}
            userModelGroups={props.user_model_groups}
            afterSave={switchToModelsView}
          />
        }
        {mode === 'gallery' &&
          <UserFactionGallery
            faction={props.faction}
            userImages={[]}
          />
        }
        {mode === 'edit' &&
          <EditUserFaction
            gameSystem={props.game_system}
            faction={props.faction}
            userFaction={props.user_faction}
          />
        }
      </div>
    </div>
  );
};

export default MyCollectionFaction;
