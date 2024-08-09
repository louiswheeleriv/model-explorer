import React, { useState } from "react";
import { Faction, GameSystem, Model, User, UserFaction, UserImageAssociation, UserImage } from "../types/models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";
import ModelList from "./ModelList";
import TabsBar from "../common/TabsBar";
import EditFaction from "./EditFaction";
import FactionGallery from "./FactionGallery";

type Props = {
  current_user: User;
  game_system: GameSystem;
  faction: Faction;
  users: User[];
  user_factions: UserFaction[];
  models: Model[];
  num_users_by_model_id: Record<number, number>;
  user_images: UserImage[];
  user_image_associations: UserImageAssociation[];
};

const FactionDetail = (props: Props) => {
  const restrictedModes = ['edit'];
  const urlParams = new URLSearchParams(document.location.search);
  const [mode, setMode] = useState<string>(urlParams.get('mode') || 'models');

  return (
    <div id='faction-detail' className='px-6 py-8 max-w-[600px] mx-auto'>
      <div className='flex mb-5'>
        <div className='flex-1'>
          <a href={'/game-systems/'+props.faction.game_system_id}>
            <FontAwesomeIcon icon={byPrefixAndName.fas['left']} className='mr-1' />
            {props.game_system.name}
          </a>
        </div>
        <div className='text-2xl text-center'>
          {props.faction.name}
        </div>
        <div className='flex-1'></div>
      </div>

      <TabsBar
        tabs={[
          { value: 'models', label: 'Models', icon: 'chess-knight' },
          { value: 'gallery', label: 'Gallery', icon: 'camera', iconBadgeNumber: props.user_image_associations.length },
          { value: 'edit', label: 'Edit', icon: 'gear' }
        ].filter((tab) => (
          props.current_user || !restrictedModes.includes(tab.value)
        ))}
        initialTab={mode}
        onTabClicked={(tabValue: string) => setMode(tabValue)} />

      <div className='mt-2'>
        {mode === 'models' &&
          <ModelList
            models={props.models}
            numUsersByModelId={props.num_users_by_model_id} />
        }
        {mode === 'gallery' &&
          <FactionGallery
            faction={props.faction}
            users={props.users}
            userFactions={props.user_factions}
            userImages={props.user_images}
            userImageAssociations={props.user_image_associations} />
        }
        {mode === 'edit' &&
          <EditFaction
            gameSystem={props.game_system}
            faction={props.faction} />
        }
      </div>

      
    </div>
  );
};

export default FactionDetail;
