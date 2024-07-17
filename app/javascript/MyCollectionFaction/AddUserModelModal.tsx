import React, { useState, useEffect } from "react";
import { Faction, Model, UserModel, QuantityByStatus, UserModelGroup } from "../types/models";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";
import UserModelStatusEditor from "../common/UserModelStatusEditor";
import $ from 'jquery';
import { apiCall } from "../utils/helpers";

export function openAddUserModelModal() {
  $('#add-user-model-modal').css({
    'opacity': 1,
    'z-index': 5
  });
}

type Props = {
  faction: Faction;
  factionModels: Model[];
  userModels: UserModel[];
  userModelGroups: UserModelGroup[];
};

const AddUserModelModal = (props: Props) => {
  const [selectedModelId, setSelectedModelId] = useState<string | number>('none');
  const [newModelName, setNewModelName] = useState('');
  const [userModelName, setUserModelName] = useState('');
  const [userModelGroupId, setUserModelGroupId] = useState<number | string | undefined>(undefined);

  const [userModelQuantityByStatus, setUserModelQuantityByStatus] = useState<QuantityByStatus>({
    unassembled: 0,
    assembled: 0,
    in_progress: 0,
    finished: 0
  });

  const [addUserModelButtonDisabled, setAddUserModelButtonDisabled] = useState(true);
  const [error, setError] = useState('');

  let modelOptions: { value: string | number; label: string; }[] = [{ value: 'none', label: 'Select Model' }];
  props.factionModels
    .sort((modelA, modelB) => {
      if (modelA.name < modelB.name) return -1;
      if (modelA.name > modelB.name) return 1;
      return 0;
    })
    .forEach((model) => {
      modelOptions.push({ value: model.id, label: model.name })
    })
  modelOptions.push({ value: 'add_new', label: 'Add New Model' });

  async function createModel(): Promise<number> {
    return apiCall({
      endpoint: '/factions/'+props.faction.id+'/models',
      method: 'POST',
      body: { name: newModelName }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error)
        return body.model.id;
      })
  }

  async function addUserModel() {
    let modelId = selectedModelId;
    if (modelId === 'add_new') modelId = await createModel();

    apiCall({
      endpoint: '/my-collection/factions/'+props.faction.id+'/user-models',
      method: 'POST',
      body: {
        model_id: modelId,
        name: userModelName,
        user_model_group_id: userModelGroupId,
        quantity_by_status: {
          unassembled: userModelQuantityByStatus.unassembled,
          assembled: userModelQuantityByStatus.assembled,
          in_progress: userModelQuantityByStatus.in_progress,
          finished: userModelQuantityByStatus.finished
        }
      }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) {
          setError(body.error || body.exception);
        } else {
          window.location.assign('/my-collection/' + props.faction.name);
        }
      });
  }

  function hideAddUserModelModal() {
    $('#add-user-model-modal').css({
      'opacity': 0,
      'z-index': -5
    });
  }

  useEffect(() => {
    const wasDisabled = addUserModelButtonDisabled;
    const isDisabled = !(
      (selectedModelId === 'add_new' && newModelName) ||
      (selectedModelId !== 'none' && selectedModelId !== 'add_new')
    );
    if (isDisabled !== wasDisabled) setAddUserModelButtonDisabled(isDisabled);
  }, [selectedModelId, newModelName])

  return (
    <div id="add-user-model-modal" tabIndex={-1} className="opacity-0 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 -z-50 justify-center flex items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full transition-all duration-250">
      <div className="relative m-auto p-4 w-full max-w-md max-h-full">
        <div className="relative rounded-lg shadow bg-gray-700">
          
          <div className='p-4 border-b border-gray-600 modal-header'>
            <div className="flex items-center justify-between rounded-t">
              <h3 className="text-lg font-semibold">
                Add Model(s) to My Collection
              </h3>
              <button type="button" onClick={hideAddUserModelModal} className="bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white">
                <FontAwesomeIcon icon={byPrefixAndName.fas['xmark']} />
              </button>
            </div>
          </div>

          <div className='p-4 modal-content'>
            <div className='mb-5'>
              <label htmlFor="model-selection" className="block mb-2 text-sm font-medium">Model</label>
              <Select
                id='model-selection'
                value={selectedModelId}
                onChange={e => setSelectedModelId(e.target.value)}>
                  {modelOptions.map((opt) => (
                    <option key={'model-selection-'+opt.value} value={opt.value}>{opt.label}</option>
                  ))}
              </Select>
              {selectedModelId === 'add_new' && (
                <Input
                  placeholder='General Model Name (e.g. Intercessors)'
                  defaultValue={newModelName}
                  onChange={e => setNewModelName(e.target.value)}
                  className='mt-5' />
              )}
              <Input
                  placeholder='(Optional) Custom Name (e.g. Intercessors with Chainswords)'
                  defaultValue={userModelName}
                  onChange={e => setUserModelName(e.target.value)}
                  className='mt-5' />

              <div className='mt-5 mb-2 text-sm font-medium'>Model Group</div>
              <Select
                defaultValue={undefined}
                onChange={e => {setUserModelGroupId(e.target.value)}}>
                  <option key={undefined} value={undefined}>None</option>
                  {props.userModelGroups.map((group) => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                  ))}
              </Select>
            </div>

            <div className='overflow-hidden mb-5'>
              <UserModelStatusEditor
                quantityByStatus={userModelQuantityByStatus}
                onChange={setUserModelQuantityByStatus}
                className='model-status-editor' />
            </div>

            <div className='flex items-center mb-5'>
              <Button onClick={addUserModel} disabled={addUserModelButtonDisabled} className='max-w-[170px] mx-auto'>
                <FontAwesomeIcon icon={byPrefixAndName.fas['plus']} className='mr-2' />
                Add Model(s)
              </Button>
            </div>

            <div className='text-center text-red-500'>{error}</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModelModal;
