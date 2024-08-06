import React, { useState, useEffect } from "react";
import { GameSystem, Faction, UserFaction } from "../types/models";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";
import { apiCall } from "../utils/helpers";
import Modal from "../common/Modal";

type Props = {
  userFactions: UserFaction[];
  allFactions: Faction[];
  allGameSystems: GameSystem[];
  visible: boolean;
  onClose: () => void;
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
        endpoint: '/user-factions',
        method: 'POST',
        body: {
          faction_id: factionId,
          name: userFactionName
        }
      })
        .then((response) => response.json())
        .then((body) => {
          if (body.status >= 300) throw new Error(body.error)
          window.location.assign('/user-factions/'+body.user_faction.id);
        })
    } catch(err) {
      if (err instanceof Error) setError(err.message);
    }
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
    <Modal
      id='add-faction-modal'
      headerText='Add Faction to My Collection'
      visible={props.visible}
      onClose={props.onClose}>

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
    </Modal>
  );
};

export default AddFactionModal;
