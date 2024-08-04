import React, { useState, useEffect } from "react";
import { Faction, Model, UserModel, QuantityByStatus, UserModelGroup, UserFaction } from "../types/models";
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
  isCurrentUser: boolean;
  faction: Faction;
  userFaction: UserFaction;
  factionModels: Model[];
  userModels: UserModel[];
  userModelGroups: UserModelGroup[];
};

type UserModelCreationResult = {
  createdUserModel: UserModel;
  modelId: string | number;
  userModelGroupId?: string | number;
}

const AddUserModelModal = (props: Props) => {
  const [selectedModelId, setSelectedModelId] = useState<string | number>('none');
  const [newModelName, setNewModelName] = useState('');
  const [userModelName, setUserModelName] = useState('');
  const [userModelGroupId, setUserModelGroupId] = useState<number | string | undefined>('none');
  const [newGroupName, setNewGroupName] = useState('');

  const [models, setModels] = useState<Model[]>(
    props.factionModels.sort((modelA, modelB) => {
      if (modelA.name < modelB.name) return -1;
      if (modelA.name > modelB.name) return 1;
      return 0;
    })
  );
  const [userModelGroups, setUserModelGroups] = useState<UserModelGroup[]>(props.userModelGroups);

  const zeroQuantityByStatus = {
    unassembled: 0,
    assembled: 0,
    in_progress: 0,
    finished: 0
  };
  const [userModelQuantityByStatus, setUserModelQuantityByStatus] = useState<QuantityByStatus>(zeroQuantityByStatus);

  const [addUserModelButtonDisabled, setAddUserModelButtonDisabled] = useState(true);
  const [error, setError] = useState('');

  async function createModel(): Promise<number> {
    return apiCall({
      endpoint: '/factions/'+props.faction.id+'/models',
      method: 'POST',
      body: {
        name: newModelName.trim()
      }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error)
        return body.model.id;
      })
  }

  async function createGroup(): Promise<number> {
    return apiCall({
      endpoint: '/user-factions/'+props.userFaction.id+'/group',
      method: 'POST',
      body: {
        name: newGroupName.trim()
      }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error)
        return body.user_model_group.id;
      })
  }

  async function saveUserModel(): Promise<UserModelCreationResult | undefined> {
    let modelId = selectedModelId;
    if (modelId === 'add_new') modelId = await createModel();
    let groupId = userModelGroupId;
    if (userModelGroupId === 'none') groupId = undefined;
    if (userModelGroupId === 'add_new') groupId = await createGroup();

    return apiCall({
      endpoint: '/user-factions/'+props.userFaction.id+'/user-models',
      method: 'POST',
      body: {
        model_id: modelId,
        name: userModelName.trim(),
        user_model_group_id: groupId,
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
          return {
            createdUserModel: body.user_model,
            modelId: modelId,
            userModelGroupId: groupId
          };
        }
      });
  }

  async function addUserModel() {
    await saveUserModel();
    location.reload();
  }

  async function addUserModelAndMore() {
    const creationResult = await saveUserModel();
    upsertCreatedModelToState(creationResult?.modelId);
    upsertCreatedGroupToState(creationResult?.userModelGroupId);
    resetModalInputs();
  }

  function upsertCreatedModelToState(modelId?: string | number) {
    if (!modelId) return;
    if (models.find((model) => model.id === Number(modelId))) return;
    const newModel = {
      id: Number(modelId),
      faction_id: props.faction.id,
      name: newModelName
    };
    setModels([models, newModel].flat().sort((modelA, modelB) => {
      if (modelA.name < modelB.name) return -1;
      if (modelA.name > modelB.name) return 1;
      return 0;
    }));
  }

  function upsertCreatedGroupToState(userModelGroupId?: string | number) {
    if (!userModelGroupId) return;
    if (userModelGroups.find((group) => group.id === Number(userModelGroupId))) return;
    const newGroup = {
      id: Number(userModelGroupId),
      name: newGroupName,
      user_id: props.userFaction.user_id,
      user_faction_id: props.userFaction.id
    };
    setUserModelGroups([userModelGroups, newGroup].flat());
  }

  function resetModalInputs() {
    setSelectedModelId('none');
    setNewModelName('');
    setUserModelName('');
    setUserModelGroupId('none');
    setNewGroupName('');
    setUserModelQuantityByStatus(zeroQuantityByStatus);
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
      (selectedModelId === 'add_new' && newModelName.trim()) ||
      (selectedModelId !== 'none' && selectedModelId !== 'add_new')
    );
    if (isDisabled !== wasDisabled) setAddUserModelButtonDisabled(isDisabled);
  }, [selectedModelId, newModelName]);

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
                  <option key={'model-selection-none'} value='none'>Select Model</option>
                  <option key={'model-selection-add_new'} value='add_new'>Add New Model</option>
                  {models.map((model) => (
                    <option key={'model-selection-'+model.id} value={model.id}>{model.name}</option>
                  ))}
              </Select>
              {selectedModelId === 'add_new' && (
                <Input
                  placeholder='General Model Name (e.g. Intercessors)'
                  value={newModelName}
                  onChange={e => setNewModelName(e.target.value)}
                  className='mt-5' />
              )}
              <Input
                  placeholder='(Optional) Custom Name (e.g. Intercessors with Chainswords)'
                  value={userModelName}
                  onChange={e => setUserModelName(e.target.value)}
                  className='mt-5' />

              <div className='mt-5 mb-2 text-sm font-medium'>Model Group</div>
              <Select
                value={userModelGroupId}
                onChange={e => {setUserModelGroupId(e.target.value)}}>
                  <option key={'none'} value={'none'}>None</option>
                  <option key={'add_new'} value={'add_new'}>Add New Group</option>
                  {userModelGroups.map((group) => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                  ))}
              </Select>
              {userModelGroupId === 'add_new' && (
                <Input
                  placeholder='Group Name (e.g. Elite Infantry)'
                  value={newGroupName}
                  onChange={e => setNewGroupName(e.target.value)}
                  className='mt-5' />
              )}
            </div>

            <div className='overflow-hidden mb-5'>
              <UserModelStatusEditor
                isCurrentUser={props.isCurrentUser}
                quantityByStatus={userModelQuantityByStatus}
                onChange={setUserModelQuantityByStatus}
                className='model-status-editor' />
            </div>

            <div className='flex mb-5'>
              <div className='flex-1 text-center'>
                <Button onClick={addUserModelAndMore} disabled={addUserModelButtonDisabled} className='max-w-[170px] mx-auto mr-5'>
                  <FontAwesomeIcon icon={byPrefixAndName.fas['floppy-disks']} className='mr-2' />
                  Add More
                </Button>
                <Button onClick={addUserModel} disabled={addUserModelButtonDisabled} className='max-w-[170px] mx-auto'>
                  <FontAwesomeIcon icon={byPrefixAndName.fas['floppy-disk']} className='mr-2' />
                  Save
                </Button>
              </div>
            </div>

            <div className='text-center text-red-500'>{error}</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModelModal;
