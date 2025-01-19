import React, { ChangeEvent, useEffect, useState } from "react";
import Modal from "../common/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";
import Button from "../common/Button";
import { apiCall } from "../utils/helpers";
import { GameSystem, UserFaction, UserModel } from "../types/models";
import Select from "../common/Select";

type Props = {
  visible: boolean;
  currentUserId: number;
  onSelectUserModels: (userModelIds: number[]) => void;
  onClose: () => void;
  className?: string;
};

const DraftPostModelSelectionModal = (props: Props) => {
  const [selectedGameSystemId, setSelectedGameSystemId] = useState<number | undefined>(undefined);
  const [selectedUserFactionId, setSelectedUserFactionId] = useState<number | undefined>(undefined);
  const [selectedUserModelIds, setSelectedUserModelIds] = useState<number[]>([]);

  const [gameSystems, setGameSystems] = useState<GameSystem[]>([]);
  const [userFactions, setUserFactions] = useState<UserFaction[]>([]);
  const [userModels, setUserModels] = useState<UserModel[]>([]);
  const [userModelById, setUserModelById] = useState<Record<number, UserModel>>({});

  useEffect(() => {
    (async () => {
      setGameSystems(await getGameSystems());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setSelectedUserModelIds([]);
      setUserModels([]);
      if (selectedGameSystemId) {
        setUserFactions(await getUserFactions(selectedGameSystemId));
      } else {
        setUserFactions([]);
      }
    })();
  }, [selectedGameSystemId]);

  useEffect(() => {
    (async () => {
      setSelectedUserModelIds([]);
      if (selectedUserFactionId) {
        setUserModels(await getUserModels(selectedUserFactionId));
      } else {
        setUserModels([]);
      }
    })();
  }, [selectedUserFactionId]);

  useEffect(() => {
    setUserModelById(
      userModels.reduce((map, userModel) => {
        map[userModel.id] = userModel;
        return map;
      }, {} as Record<number, UserModel>)
    )
  }, [userModels]);

  function getGameSystems(): Promise<GameSystem[]> {
    return apiCall({
      method: 'GET',
      endpoint: '/api/users/'+props.currentUserId+'/game_systems'
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error);

        return body.game_systems;
      });
  }

  function getUserFactions(gameSystemId: number): Promise<UserFaction[]> {
    return apiCall({
      method: 'GET',
      endpoint: '/api/users/'+props.currentUserId+'/user_factions',
      urlParams: {
        game_system_id: gameSystemId
      }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error);

        return body.user_factions;
      });
  }

  function getUserModels(userFactionId: number): Promise<UserModel[]> {
    return apiCall({
      method: 'GET',
      endpoint: '/api/users/'+props.currentUserId+'/user_models',
      urlParams: {
        user_faction_id: userFactionId
      }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error);

        return body.user_models;
      });
  }

  function handleSelectedGameSystemChanged(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    const valueToSet = value !== '' ? Number(value) : undefined;
    setSelectedGameSystemId(valueToSet);
  }

  function handleSelectedUserFactionChanged(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    const valueToSet = value !== '' ? Number(value) : undefined;
    setSelectedUserFactionId(valueToSet);
  }

  function handleUserModelSelected(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    const userModelId = value !== '' ? Number(value) : undefined;
    if (!userModelId) return;

    setSelectedUserModelIds([...selectedUserModelIds, userModelId]);
  }

  function handleUserModelDeselected(userModelId: number) {
    setSelectedUserModelIds(selectedUserModelIds.filter((id) => id !== userModelId));
  }

  function handleSubmit() {
    if (selectedUserModelIds.length === 0) throw new Error('No models selected');
    
    props.onSelectUserModels(selectedUserModelIds);
  }

  function handleClose() {
    props.onClose();
  }

  function resetState() {
    setSelectedUserModelIds([]);
    setSelectedUserFactionId(undefined);
    setSelectedGameSystemId(undefined);
  }

  return (
    <Modal
      headerText='Select Model(s)'
      visible={props.visible}
      onClose={handleClose}>
        
        <div className='mb-5'>
          <div className='font-semibold text-left mb-2'>Game System</div>
          <Select
            value={selectedGameSystemId}
            onChange={handleSelectedGameSystemChanged}>
              <option value=''>Select Game System</option>
              {gameSystems.map((gameSystem) => (
                <option
                  key={gameSystem.id}
                  value={gameSystem.id}>
                    {gameSystem.name}
                </option>
              ))}
          </Select>
        </div>

        {userFactions.length > 0 &&
          <div className='mb-5'>
            <div className='font-semibold text-left mb-2'>Faction</div>
            <Select
              value={selectedUserFactionId}
              onChange={handleSelectedUserFactionChanged}>
                <option value=''>Select Faction</option>
                {userFactions.map((userFaction) => (
                  <option
                    key={userFaction.id}
                    value={userFaction.id}>
                      {userFaction.name &&
                        userFaction.name+' ('+userFaction.faction_name+')'
                      }
                      {!userFaction.name &&
                        userFaction.faction_name
                      }
                  </option>
                ))}
            </Select>
          </div>
        }

        {userModels.length > 0 &&
          <div className='mb-5'>
            <div className='font-semibold text-left mb-2'>Model(s)</div>
            {selectedUserModelIds.map((userModelId) => {
              const userModel = userModelById[userModelId];
              return (
                <div key={userModelId} className='flex mb-2'>
                  <Select
                    value={userModelId}
                    disabled={true}
                    className='flex-1' >
                      <option
                        key={userModelId}
                        value={userModelId}>
                          {userModel.name &&
                            userModel.name+' ('+userModel.model_name+')'
                          }
                          {!userModel.name &&
                            userModel.model_name
                          }
                      </option>
                  </Select>
                  <FontAwesomeIcon
                    icon={byPrefixAndName.fas['xmark']}
                    size='xl'
                    className='flex-none my-auto ml-3 text-red-500 cursor-pointer'
                    onClick={() => handleUserModelDeselected(userModel.id)} />
                </div>
              );
            })}
            <Select
              onChange={handleUserModelSelected}>
                <option value=''>None</option>
                {userModels
                  .filter((userModel) => !selectedUserModelIds.includes(userModel.id))
                  .map((userModel) => (
                    <option
                      key={userModel.id}
                      value={userModel.id}>
                        {userModel.name &&
                          userModel.name+' ('+userModel.model_name+')'
                        }
                        {!userModel.name &&
                          userModel.model_name
                        }
                    </option>
                  ))}
            </Select>
          </div>
        }

        {selectedUserFactionId && userModels.length === 0 &&
          <div className='text-sm text-gray-300 mb-2'>
            No models found
          </div>
        }

        <div className='flex text-right'>
          <div className='flex-1'>
            <Button
              disabled={selectedUserModelIds.length === 0}
              onClick={handleSubmit}
              className='px-5'>
                <div>
                  <FontAwesomeIcon
                    icon={byPrefixAndName.fas['chess-knight']}
                    className='mr-2' />
                  Attach to Post
                </div>
            </Button>
          </div>
        </div>
    </Modal>
  );
};

export default DraftPostModelSelectionModal;
