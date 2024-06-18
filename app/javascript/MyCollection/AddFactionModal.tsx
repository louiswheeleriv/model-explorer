import React, { useState, useEffect } from "react";
import { GameSystem, Faction, UserFaction } from "../types/models";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import $ from 'jquery';
import { apiCall } from "../utils/helpers";

export function openAddFactionModal() {
  $('#add-faction-modal').css({
    'opacity': 1,
    'z-index': 5
  });
}

const AddFactionModal = ({ userFactions, allFactions, allGameSystems, className }: {
  userFactions: UserFaction[];
  allFactions: Faction[];
  allGameSystems: GameSystem[];
  className?: string;
}) => {
  const [selectedGameSystemId, setSelectedGameSystemId] = useState<string | number>('none');
  const [newGameSystemName, setNewGameSystemName] = useState('');
  const [selectedFactionId, setSelectedFactionId] = useState<string | number>('none');
  const [newFactionName, setNewFactionName] = useState('');
  const [factionDropdownOptions, setFactionDropdownOptions] = useState<{ value: string | number; label: string; }[]>([
    { value: 'none', label: 'Select Faction' },
    { value: 'add_new_faction', label: 'Add New Faction' }
  ]);
  const [addFactionButtonDisabled, setAddFactionButtonDisabled] = useState(true);
  const [error, setError] = useState('');

  const userFactionFactionIds = userFactions.map((userFaction) => userFaction.faction_id);

  async function createGameSystem(): Promise<number> {
    return apiCall({
      endpoint: '/game_systems',
      method: 'POST',
      body: { name: newGameSystemName }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error)
        return body.game_system.id;
      })
      .catch((err) => setError(err.message));
  }

  async function createFaction(gameSystemId: number): Promise<number> {
    return apiCall({
      endpoint: '/factions',
      method: 'POST',
      body: { name: newFactionName, game_system_id: gameSystemId }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error)
        return body.faction.id;
      })
      .catch((err) => setError(err.message));
  }

  async function addFaction() {
    let gameSystemId = selectedGameSystemId;
    let factionId = selectedFactionId;
    if (selectedGameSystemId === 'add_new_game_system') {
      gameSystemId = await createGameSystem();
    }
    if (selectedFactionId === 'add_new_faction') {
      factionId = await createFaction(Number(gameSystemId));
    }

    apiCall({
      endpoint: '/my_collection/factions',
      method: 'POST',
      body: { faction_id: factionId }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error)
        // location.reload();
        window.location.assign('/my_collection/' + body.faction.name);
      })
      .catch((err) => setError(err.message));
  }

  function hideAddFactionModal() {
    $('#add-faction-modal').css({
      'opacity': 0,
      'z-index': -5
    });
  }

  useEffect(() => {
    let factionOptions = [];
    if (selectedGameSystemId !== 'add_new_game_system') {
      factionOptions.push({ value: 'none', label: 'Select Faction' })
    }
    allFactions.filter((faction) => (
      faction.game_system_id.toString() === selectedGameSystemId.toString() &&
      !userFactionFactionIds.includes(faction.id)
    )).forEach((faction) => {
      factionOptions.push({ value: faction.id, label: faction.name })
    })
    factionOptions.push({ value: 'add_new_faction', label: 'Add New Faction' });
    setFactionDropdownOptions(factionOptions);
  }, [selectedGameSystemId]);

  useEffect(() => {
    setAddFactionButtonDisabled(!(
      (
        (selectedGameSystemId === 'add_new_game_system' && newGameSystemName) ||
        (selectedGameSystemId !== 'none' && selectedGameSystemId !== 'add_new_game_system')
      ) &&
      (
        (selectedFactionId === 'add_new_faction' && newFactionName) ||
        (selectedFactionId !== 'none' && selectedFactionId !== 'add_new_faction')
      )
    ))
  }, [selectedGameSystemId, newGameSystemName, selectedFactionId, newFactionName])

  return (
    <div id="add-faction-modal" tabIndex={-1} className="opacity-0 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 -z-50 justify-center flex items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full transition-all duration-250">
      <div className="relative m-auto p-4 w-full max-w-md max-h-full">
        <div className="relative p-4 rounded-lg shadow bg-gray-700">
          <div className="flex items-center justify-between rounded-t border-gray-600">
            <h3 className="text-lg font-semibold">
              Add Faction to My Collection
            </h3>
            <button type="button" onClick={hideAddFactionModal} className="bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white">
              <FontAwesomeIcon icon={byPrefixAndName.fas['xmark']} />
            </button>
          </div>
          <div className='mb-4'>
            <label htmlFor="game-system-selection" className="block mb-2 text-sm font-medium">Game System</label>
            <select
              id='game-system-selection'
              value={selectedGameSystemId}
              onChange={e => setSelectedGameSystemId(e.target.value)}
              className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500">
                <option value='none'>Select Game System</option>
                {allGameSystems?.map((gameSystem) => (
                  <option value={gameSystem.id}>{gameSystem.name}</option>
                ))}
                <option value='add_new_game_system'>Add New Game System</option>
            </select>
            {selectedGameSystemId === 'add_new_game_system' && (
              <input
                type="text"
                id="game-system-new-name"
                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Name of New Game System" />
            )}
          </div>
          <div className='mb-4'>
            <label htmlFor="faction-selection" className="block mb-2 text-sm font-medium">Faction</label>
            <select
              id='faction-selection'
              value={selectedFactionId}
              onChange={e => setSelectedFactionId(e.target.value)}
              className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500">
                {factionDropdownOptions.map((opt) => (
                  <option value={opt.value}>{opt.label}</option>
                ))}
            </select>
            {(selectedFactionId === 'add_new_faction' || selectedGameSystemId === 'add_new_game_system') && (
              <input
                type="text"
                id="new-faction-name"
                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Name of New Faction" />
            )}
          </div>
          <div className='flex'>
            <button
              type="button"
              onClick={addFaction}
              disabled={addFactionButtonDisabled}
              className="flex-1 mx-auto text-white inline-flex items-center focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                <FontAwesomeIcon icon={byPrefixAndName.fas['plus']} />
                Add Faction
            </button>
          </div>
          <div className='text-center text-red'>{error}</div>
        </div>
      </div>
    </div>
  );
};

export default AddFactionModal;
