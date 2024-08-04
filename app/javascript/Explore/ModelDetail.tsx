import React, { useState } from "react";
import { Faction, GameSystem, Model, User, UserImage, UserModel, UserModelImageAssociation } from "../types/models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";
import TabsBar from "../common/TabsBar";
import ModelGallery from "./ModelGallery";
import EditModel from "./EditModel";
import UserModelList from "./UserModelList";

type Props = {
  current_user: User;
  game_system: GameSystem;
  faction: Faction;
  model: Model;
  users: User[];
  user_models: UserModel[];
  user_images: UserImage[];
  user_model_image_associations: UserModelImageAssociation[];
};

const ModelDetail = (props: Props) => {
  const restrictedModes = ['edit'];
  const urlParams = new URLSearchParams(document.location.search);
  const [mode, setMode] = useState<string>(urlParams.get('mode') || 'userModels');

  return (
    <div id='model-detail' className='px-6 py-8 max-w-[600px] mx-auto'>
      <div className='flex mb-5'>
        <div className='flex-1'>
          <a href={'/factions/'+props.faction.id}>
            <FontAwesomeIcon icon={byPrefixAndName.fas['left']} className='mr-1' />
            {props.faction.name}
          </a>
        </div>
        <div className='text-2xl text-center'>
          {props.model.name}
        </div>
        <div className='flex-1'></div>
      </div>

      <TabsBar
        tabs={[
          { value: 'userModels', label: 'User Models', icon: 'chess-knight' },
          { value: 'gallery', label: 'Gallery', icon: 'camera' },
          { value: 'edit', label: 'Edit', icon: 'gear' }
        ].filter((tab) => (
          props.current_user || !restrictedModes.includes(tab.value)
        ))}
        initialTab={mode}
        onTabClicked={(tabValue: string) => setMode(tabValue)} />

      <div className='mt-2'>
        {mode === 'userModels' &&
          <UserModelList
            faction={props.faction}
            model={props.model}
            users={props.users}
            userModels={props.user_models} />
        }
        {mode === 'gallery' &&
          <ModelGallery
            model={props.model}
            users={props.users}
            userModels={props.user_models}
            userImages={props.user_images}
            userModelImageAssociations={props.user_model_image_associations} />
        }
        {mode === 'edit' &&
          <EditModel
            gameSystem={props.game_system}
            faction={props.faction}
            model={props.model} />
        }
      </div>
    </div>
  );
};

export default ModelDetail;
