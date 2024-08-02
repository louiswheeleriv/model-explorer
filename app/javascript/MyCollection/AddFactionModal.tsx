import React, { useState, useEffect } from "react";
import { GameSystem, Faction, UserFaction } from "../types/models";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";
import $ from 'jquery';
import { apiCall } from "../utils/helpers";

export function openAddFactionModal() {
  $('#add-faction-modal').css({
    'opacity': 1,
    'z-index': 5
  });
}

type Props = {
  userFactions: UserFaction[];
  allFactions: Faction[];
  allGameSystems: GameSystem[];
  className?: string;
};

const AddFactionModal = (props: Props) => {
  const [selectedGameSystemId, setSelectedGameSystemId] = useState<string | number>('none');
  const [newGameSystemName, setNewGameSystemName] = useState('');
  const [selectedFactionId, setSelectedFactionId] = useState<string | number>('none');
  const [newFactionName, setNewFactionName] = useState('');
  const [userFactionName, setUserFactionName] = useState('');
  const [factionDropdownOptions, setFactionDropdownOptions] = useState<{ value: string | number; label: string; }[]>([
    { value: 'none', label: 'Select Faction' },
    { value: 'add_new_faction', label: 'Add New Faction' }
  ]);
  const [addFactionButtonDisabled, setAddFactionButtonDisabled] = useState(true);
  const [error, setError] = useState('');

  const userFactionFactionIds = props.userFactions.map((userFaction) => userFaction.faction_id);

  async function createGameSystem(): Promise<number> {
    return apiCall({
      endpoint: '/game-systems',
      method: 'POST',
      body: {
        name: newGameSystemName.trim()
      }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error)
        return body.game_system.id;
      })
  }

  async function createFaction(gameSystemId: number): Promise<number> {
    return apiCall({
      endpoint: '/factions',
      method: 'POST',
      body: {
        name: newFactionName.trim(),
        game_system_id: gameSystemId
      }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error)
        return body.faction.id;
      })
  }

  async function addFaction() {
    try {
      let gameSystemId = selectedGameSystemId;
      let factionId = selectedFactionId;
      if (selectedGameSystemId === 'add_new_game_system') {
        gameSystemId = await createGameSystem();
      }
      if (selectedFactionId === 'add_new_faction') {
        factionId = await createFaction(Number(gameSystemId));
      }

      apiCall({
        endpoint: '/my-collection/user-factions',
        method: 'POST',
        body: {
          faction_id: factionId,
          name: userFactionName
        }
      })
        .then((response) => response.json())
        .then((body) => {
          if (body.status >= 300) throw new Error(body.error)
          window.location.assign('/my-collection/user-factions/'+body.user_faction.id);
        })
    } catch(err) {
      if (err instanceof Error) setError(err.message);
    }
  }

  function hideAddFactionModal() {
    $('#add-faction-modal').css({
      'opacity': 0,
      'z-index': -5
    });
  }

  useEffect(() => {
    let factionOptions: { value: number | string; label: string }[] = [{ value: 'none', label: 'Select Faction' }];
    props.allFactions.filter((faction) => (
      faction.game_system_id.toString() === selectedGameSystemId.toString()
    )).forEach((faction) => {
      factionOptions.push({ value: faction.id, label: faction.name })
    })
    factionOptions.push({ value: 'add_new_faction', label: 'Add New Faction' });
    setFactionDropdownOptions(factionOptions);
  }, [selectedGameSystemId]);

  useEffect(() => {
    setAddFactionButtonDisabled(!(
      (
        (selectedGameSystemId === 'add_new_game_system' && newGameSystemName.trim()) ||
        (selectedGameSystemId !== 'none' && selectedGameSystemId !== 'add_new_game_system')
      ) &&
      (
        (selectedFactionId === 'add_new_faction' && newFactionName.trim()) ||
        (selectedFactionId !== 'none' && selectedFactionId !== 'add_new_faction')
      )
    ))
  }, [selectedGameSystemId, newGameSystemName, selectedFactionId, newFactionName])

  return (
    <div id="add-faction-modal" tabIndex={-1} className="opacity-0 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 -z-50 justify-center flex items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full transition-all duration-250">
      <div className="relative m-auto p-4 w-full max-w-md max-h-full">
        <div className="relative rounded-lg shadow bg-gray-700">
          
          <div className='p-4 border-b border-gray-600 modal-header'>
            <div className="flex items-center justify-between rounded-t">
              <h3 className="text-lg font-semibold">
                Add Faction to My Collection
              </h3>
              <button type="button" onClick={hideAddFactionModal} className="bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white">
                <FontAwesomeIcon icon={byPrefixAndName.fas['xmark']} />
              </button>
            </div>
          </div>

          <div className='p-4 modal-content'>
            <div className='mb-4'>
              <label htmlFor="game-system-selection" className="block mb-2 text-sm font-medium">Game System</label>
              <Select
                id='game-system-selection'
                value={selectedGameSystemId}
                onChange={e => setSelectedGameSystemId(e.target.value)}>
                  <option value='none'>Select Game System</option>
                  {props.allGameSystems?.map((gameSystem) => (
                    <option key={'game-system-selection-'+gameSystem.id} value={gameSystem.id}>{gameSystem.name}</option>
                  ))}
                  <option value='add_new_game_system'>Add New Game System</option>
              </Select>
              {selectedGameSystemId === 'add_new_game_system' && (
                <Input
                  placeholder='Name of New Game System'
                  defaultValue={newGameSystemName}
                  onChange={e => setNewGameSystemName(e.target.value)}
                  className='mt-5' />
              )}
            </div>

            <div className='mb-4'>
              <label htmlFor="faction-selection" className="block mb-2 text-sm font-medium">Faction</label>
              <Select
                id='faction-selection'
                value={selectedFactionId}
                onChange={e => setSelectedFactionId(e.target.value)}>
                  {factionDropdownOptions.map((opt) => (
                    <option key={'faction-selection-'+opt.value} value={opt.value}>{opt.label}</option>
                  ))}
              </Select>
              {(selectedFactionId === 'add_new_faction' || selectedGameSystemId === 'add_new_game_system') && (
                <Input
                  placeholder="Name of New Faction"
                  defaultValue={newFactionName}
                  onChange={e => setNewFactionName(e.target.value)}
                  className='mt-5' />
              )}
              <Input
                placeholder='(Optional) Custom Name (e.g. The Ultra Guys)'
                defaultValue={userFactionName}
                onChange={e => setUserFactionName(e.target.value)}
                className='mt-5' />
            </div>

            <div className='flex items-center mb-5'>
              <Button onClick={addFaction} disabled={addFactionButtonDisabled} className='max-w-[170px] mx-auto'>
                <FontAwesomeIcon icon={byPrefixAndName.fas['flag']} className='mr-2' />
                Add Faction
              </Button>
            </div>

            <div className='text-center text-red-500'>{error}</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFactionModal;
