import React, { useState } from "react";
import { Faction, GameSystem, Model, User, UserFaction, UserImage, UserModel, UserModelGroup, UserImageAssociation } from "../types/models";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import UserFactionModels from "./UserFactionModels";
import UserFactionGroups from "./UserFactionGroups";
import UserFactionGallery from "./UserFactionGallery";
import EditUserFaction from "./EditUserFaction";
import TabsBar from "../common/TabsBar";

type Props = {
  is_current_user: boolean;
  user: User;
  game_system: GameSystem;
  faction: Faction;
  user_faction: UserFaction;
  faction_model_by_id: Record<number, Model>;
  user_models: UserModel[];
  user_model_groups: UserModelGroup[];
  user_images: UserImage[];
  user_image_associations: UserImageAssociation[];
}

const CollectionFaction = (props: Props) => {
  const urlParams = new URLSearchParams(document.location.search);
  const [mode, setMode] = useState<string>(urlParams.get('mode') || 'models');

  const userFactionImageAssociations =
    props.user_image_associations
      .filter(assoc => assoc.user_faction_id);

  const userModelImageAssociationsByUserModelId =
    props.user_image_associations
      .filter(assoc => assoc.user_model_id)
      .reduce((acc: Record<number, UserImageAssociation[]>, assoc) => {
        const key = assoc.user_model_id;
        if (!key) throw 'Invalid UserImageAssociation: '+JSON.stringify(assoc);
        if (!acc[key]) acc[key] = [];
        acc[key].push(assoc);
        return acc;
      }, {});

  function switchToManageGroupsView() { setMode('groups') }

  function handleGroupsSaved() {
    window.location.assign('/user-factions/'+props.user_faction.id+'?mode=groups');
  }

  return (
    <div className='px-6 py-8 max-w-[600px] mx-auto'>
      <div className='flex'>
        <div className='flex-1'>
          {props.is_current_user &&
            <a href='/my-collection'>
              <FontAwesomeIcon icon={byPrefixAndName.fas['left']} className='mr-1' />
              My Collection
            </a>
          }
          {!props.is_current_user &&
            <a href={'/users/'+props.user_faction.user_id}>
              <FontAwesomeIcon icon={byPrefixAndName.fas['left']} className='mr-1' />
              {props.user.display_name || props.user.username}
            </a>
          }
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

      <TabsBar
        tabs={[
          { value: 'models', label: 'Models', icon: 'chess-knight' },
          { value: 'groups', label: 'Groups', icon: 'layer-group' },
          { value: 'gallery', label: 'Gallery', icon: 'camera', iconBadgeNumber: userFactionImageAssociations.length },
          { value: 'edit', label: 'Edit', icon: 'gear' }
        ].filter((tab) => (
          props.is_current_user || ['models', 'gallery'].includes(tab.value)
        ))}
        initialTab={mode}
        onTabClicked={(tabValue: string) => setMode(tabValue)} />

      <div className='mt-2'>
        {mode === 'models' &&
          <UserFactionModels
            isCurrentUser={props.is_current_user}
            faction={props.faction}
            userFaction={props.user_faction}
            userModels={props.user_models}
            userModelGroups={props.user_model_groups}
            userImageAssociationsByUserModelId={userModelImageAssociationsByUserModelId}
            factionModelById={props.faction_model_by_id}
            onManageGroupsButtonClick={switchToManageGroupsView} />
        }
        {mode === 'groups' &&
          <UserFactionGroups
            faction={props.faction}
            userFaction={props.user_faction}
            userModelGroups={props.user_model_groups}
            afterSave={handleGroupsSaved}
          />
        }
        {mode === 'gallery' &&
          <UserFactionGallery
            isCurrentUser={props.is_current_user}
            faction={props.faction}
            userFaction={props.user_faction}
            userImages={props.user_images}
            userImageAssociations={userFactionImageAssociations}
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

export default CollectionFaction;
