import React, { useState } from "react";
import { Faction, GameSystem, Model, User, UserFaction, UserImage, UserModel } from "../types/models";
import TabsBar from "../common/TabsBar";
import ProfilePicture from "../common/ProfilePicture";
import UserCollection from "./UserCollection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";

type Props = {
  user: User;
  profile_picture?: UserImage;
  game_systems: GameSystem[];
  factions: Faction[];
  user_factions: UserFaction[];
  models: Model[];
  user_models: UserModel[];
  num_images_by_user_faction_id: Record<number, number>;
};

const User = (props: Props) => {
  const urlParams = new URLSearchParams(document.location.search);
  const [mode, setMode] = useState<string>(urlParams.get('mode') || 'collection');
  
  return (
    <div id='user' className='px-6 py-8 max-w-[600px] mx-auto'>

      <div className='flex'>
        <div className='flex-1'>
          <a href='/social'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['left']} className='mr-1' />
            Social
          </a>
        </div>
        <div className='flex-1 text-2xl text-center mb-5'>
          <ProfilePicture
            width='100px'
            imageUrl={props.profile_picture?.url}
            className='mx-auto mb-2' />
          {props.user.display_name || props.user.username}
        </div>
        <div className='flex-1'></div>
      </div>

      <TabsBar
        tabs={[
          { value: 'collection', label: 'Collection', icon: 'chess-knight' },
          { value: 'info', label: 'Info', icon: 'book' }
        ]}
        initialTab={mode}
        onTabClicked={(tabValue: string) => setMode(tabValue)}
        className='mb-3' />

      {mode === 'collection' &&
        <UserCollection
          userFactions={props.user_factions}
          userModels={props.user_models}
          models={props.models}
          factions={props.factions}
          gameSystems={props.game_systems}
          numImagesByUserFactionId={props.num_images_by_user_faction_id} />
      }
      {mode === 'info' &&
        <div className='text-center'>
          {props.user.bio || 'No user bio'}
        </div>
      }
    </div>
  );
};

export default User;
