import React, { useEffect, useState } from "react";
import { Faction, GameSystem } from "../types/models";
import Button from "../common/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import { apiCall } from "../utils/helpers";
import Select from "../common/Select";
import Input from "../common/Input";

type Props = {
  gameSystem: GameSystem;
  faction: Faction;
}

const EditFaction = (props: Props) => {
  const [factionName, setFactionName] = useState(props.faction.name);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
  const [error, setError] = useState('');

  async function saveFaction() {
    try {
      apiCall({
        endpoint: '/factions/'+props.faction.id,
        method: 'PUT',
        body: {
          name: factionName
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

  useEffect(() => {
    setSaveButtonDisabled(factionName === props.faction.name);
  }, [factionName]);

  return (
    <>
      <div className='mt-5 mb-2 text-sm font-medium'>Game System</div>
      <Select
        value={props.gameSystem.id}
        disabled={true}>
          <option key={props.gameSystem.id} value={props.gameSystem.id}>{props.gameSystem.name}</option>
      </Select>

      <div className='mt-5 mb-2 text-sm font-medium'>Faction Name</div>
      <Input
        placeholder='e.g. Space Marines'
        defaultValue={props.faction.name}
        onChange={e => {setFactionName(e.target.value)}} />

      <div className='flex items-center my-5'>
        <Button onClick={saveFaction} disabled={saveButtonDisabled} className='max-w-[170px] mx-auto'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['floppy-disk']} className='mr-2' />
          Save
        </Button>
      </div>

      <div className='text-center text-red-500'>{error}</div>
    </>
  );
};

export default EditFaction;
