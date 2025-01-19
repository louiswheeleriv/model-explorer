import React, { useState } from "react";
import { Faction, GameSystem, Model, User, UserFaction, UserImage, UserModel } from "../types/models";
import TabsBar from "../common/TabsBar";
import ProfilePicture from "../common/ProfilePicture";
import UserCollection from "./UserCollection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";
import DropdownButton from "../common/DropdownButton";
import DropdownButtonItem from "../common/DropdownButtonItem";
import { apiCall } from "../utils/helpers";

type Props = {
  current_user_id?: number;
  user: User;
  profile_picture?: UserImage;
  game_systems: GameSystem[];
  factions: Faction[];
  user_factions: UserFaction[];
  models: Model[];
  user_models: UserModel[];
  num_images_by_user_faction_id: Record<number, number>;
  is_followed_by_current_user: boolean;
};

const User = (props: Props) => {
  const urlParams = new URLSearchParams(document.location.search);
  const [mode, setMode] = useState<string>(urlParams.get('mode') || 'collection');

  const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState<boolean>(false);
  const [isFollowedByCurrentUser, setIsFollowedByCurrentUser] = useState<boolean>(props.is_followed_by_current_user);

  function toggleFollow(toggle: boolean) {
    apiCall({
      method: 'POST',
      endpoint: '/social/follows',
      body: {
        user_id: props.user.id,
        follow: toggle
      }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error);

        setIsFollowedByCurrentUser(toggle);
      });
  }
  
  return (
    <div id='user' className='px-6 py-8 max-w-[600px] mx-auto'>

      <div className='flex'>
        <div className='flex-1 text-left'>
          <a href='/users'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['left']} className='mr-1' />
            Users
          </a>
        </div>
        <div className='flex-1 text-2xl text-right'>
          {props.user.id !== props.current_user_id &&
            <DropdownButton
              colorSet='transparentLightText'
              leftOrRight='left'
              isOpen={isActionsDropdownOpen}
              onToggle={() => setIsActionsDropdownOpen(!isActionsDropdownOpen)}>
                <DropdownButtonItem
                  isFirst={true}
                  isLast={true}
                  onClick={() => toggleFollow(!isFollowedByCurrentUser)}>
                    <FontAwesomeIcon
                      icon={byPrefixAndName.fas[isFollowedByCurrentUser ? 'bell-slash' : 'bell']}
                      className='mr-2' />
                    {isFollowedByCurrentUser ? 'Unfollow' : 'Follow'}
                </DropdownButtonItem>
            </DropdownButton>
          }
        </div>
      </div>
      <div className='text-2xl text-center mb-5'>
        <ProfilePicture
          width='100px'
          imageUrl={props.profile_picture?.url}
          className='mx-auto mb-2' />
        {props.user.display_name || props.user.username}
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
