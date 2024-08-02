import React, { useState } from "react";
import { Faction, GameSystem, UserFaction } from "../types/models";
import Button from "../common/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import { apiCall } from "../utils/helpers";
import Select from "../common/Select";
import Input from "../common/Input";

type Props = {
  gameSystem: GameSystem;
  faction: Faction;
  userFaction: UserFaction;
}

const EditUserFaction = (props: Props) => {
  const [userFactionName, setUserFactionName] = useState(props.userFaction.name);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [error, setError] = useState('');

  async function saveUserFaction() {
    try {
      apiCall({
        endpoint: '/my-collection/factions/'+props.faction.id,
        method: 'PUT',
        body: {
          name: userFactionName
        }
      })
        .then((response) => response.json())
        .then((body) => {
          if (body.status >= 300) throw new Error(body.error)
          location.reload();
        });
    } catch(err) {
      if (err instanceof Error) setError(err.message);
    }
  }

  async function deleteUserFaction() {
    try {
      apiCall({
        endpoint: '/my-collection/factions/'+props.faction.id,
        method: 'DELETE'
      })
        .then((response) => response.json())
        .then((body) => {
          if (body.status >= 300) throw new Error(body.error)
          window.location.assign('/my-collection');
        });
    } catch(err) {
      if (err instanceof Error) setError(err.message);
    }
  }

  return (
    <>
      <div className='mt-5 mb-2 text-sm font-medium'>Game System</div>
      <Select
        defaultValue={props.gameSystem.id}
        disabled={true}>
          <option key={props.gameSystem.id} value={props.gameSystem.id}>{props.gameSystem.name}</option>
      </Select>

      <div className='mt-5 mb-2 text-sm font-medium'>Faction</div>
      <Select
        defaultValue={props.faction.id}
        disabled={true}>
          <option key={props.faction.id} value={props.faction.id}>{props.faction.name}</option>
      </Select>

      <div className='mt-5 mb-2 text-sm font-medium'>Custom Name</div>
      <Input
        placeholder='(Optional) Custom Name (e.g. Intercessors with Chainswords)'
        defaultValue={props.userFaction.name}
        onChange={e => {setUserFactionName(e.target.value)}} />

      <div className='flex items-center my-5'>
        <div className='flex-1'></div>
        <div className='flex-1 text-center'>
          <Button onClick={saveUserFaction} disabled={saveButtonDisabled} className='max-w-[170px] mx-auto'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['floppy-disk']} className='mr-2' />
            Save
          </Button>
        </div>
        <div className='flex-1 text-end'>
          <Button onClick={deleteUserFaction} className='max-w-[170px] mx-auto bg-red-500'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['trash']} className='text-white' />
          </Button>
        </div>
      </div>

      <div className='text-center text-red-500'>{error}</div>
    </>
  );
};

export default EditUserFaction;
