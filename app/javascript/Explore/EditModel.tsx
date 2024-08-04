import React, { useEffect, useState } from "react";
import { Faction, GameSystem, Model } from "../types/models";
import Button from "../common/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import { apiCall } from "../utils/helpers";
import Select from "../common/Select";
import Input from "../common/Input";

type Props = {
  gameSystem: GameSystem;
  faction: Faction;
  model: Model;
}

const EditModel = (props: Props) => {
  const [modelName, setModelName] = useState(props.model.name);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
  const [error, setError] = useState('');

  async function saveModel() {
    try {
      apiCall({
        endpoint: '/models/'+props.model.id,
        method: 'PUT',
        body: {
          name: modelName
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
    setSaveButtonDisabled(modelName === props.model.name);
  }, [modelName]);

  return (
    <>
      <div className='mt-5 mb-2 text-sm font-medium'>Game System</div>
      <Select
        value={props.gameSystem.id}
        disabled={true}>
          <option key={props.gameSystem.id} value={props.gameSystem.id}>{props.gameSystem.name}</option>
      </Select>

      <div className='mt-5 mb-2 text-sm font-medium'>Faction</div>
      <Select
        value={props.faction.id}
        disabled={true}>
          <option key={props.faction.id} value={props.faction.id}>{props.faction.name}</option>
      </Select>

      <div className='mt-5 mb-2 text-sm font-medium'>Model Name</div>
      <Input
        placeholder='General Model Name (e.g. Intercessors)'
        defaultValue={props.model.name}
        onChange={e => {setModelName(e.target.value)}} />

      <div className='flex items-center my-5'>
        <Button onClick={saveModel} disabled={saveButtonDisabled} className='max-w-[170px] mx-auto'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['floppy-disk']} className='mr-2' />
          Save
        </Button>
      </div>

      <div className='text-center text-red-500'>{error}</div>
    </>
  );
};

export default EditModel;
