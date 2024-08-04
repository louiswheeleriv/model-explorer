import React, { useState } from "react";
import { Faction, Model, UserFaction, UserModel, UserModelGroup } from "../types/models";
import Button from "../common/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import { apiCall } from "../utils/helpers";
import Select from "../common/Select";
import Input from "../common/Input";
import DeletionConfirmationModal from "../common/DeletionConfirmationModal";

type Props = {
  faction: Faction;
  userFaction: UserFaction;
  model: Model;
  userModel: UserModel;
  userModelGroups: UserModelGroup[];
}

const EditUserModel = (props: Props) => {
  const [userModelGroupId, setUserModelGroupId] = useState<number | string>(props.userModel.user_model_group_id);
  const [userModelName, setUserModelName] = useState<string>(props.userModel.name);
  const [deletionConfirmationModalVisible, setDeletionConfirmationModalVisible] = useState(false);

  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [error, setError] = useState('');

  const userModelGroup = props.userModelGroups.find((group) => group.id === props.userModel.user_model_group_id);

  async function saveUserModel() {
    try {
      apiCall({
        endpoint: '/user-models/'+props.userModel.id,
        method: 'PUT',
        body: {
          user_model_group_id: userModelGroupId === 'None' ? null : userModelGroupId,
          name: userModelName
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

  async function deleteUserModel() {
    try {
      apiCall({
        endpoint: '/user-models/'+props.userModel.id,
        method: 'DELETE'
      })
        .then((response) => response.json())
        .then((body) => {
          if (body.status >= 300) throw new Error(body.error)
          window.location.assign('/user-factions/' + props.userFaction.id);
        });
    } catch(err) {
      if (err instanceof Error) setError(err.message);
    }
  }

  return (
    <>
      <div className='mt-5 mb-2 text-sm font-medium'>Faction</div>
      <Select
        defaultValue={props.faction.id}
        disabled={true}>
          <option key={props.faction.id} value={props.faction.id}>{props.faction.name}</option>
      </Select>

      <div className='mt-5 mb-2 text-sm font-medium'>Model</div>
      <Select
        defaultValue={props.model.id}
        disabled={true}>
          <option key={props.model.id} value={props.model.id}>{props.model.name}</option>
      </Select>

      <div className='mt-5 mb-2 text-sm font-medium'>Model Group</div>
      <Select
        defaultValue={props.userModel.user_model_group_id}
        onChange={e => {setUserModelGroupId(e.target.value)}}>
          <option key={undefined} value={undefined}>None</option>
          {props.userModelGroups.map((group) => (
            <option key={group.id} value={group.id}>{group.name}</option>
          ))}
      </Select>

      <div className='mt-5 mb-2 text-sm font-medium'>Custom Name</div>
      <Input
        placeholder='(Optional) Custom Name (e.g. Intercessors with Chainswords)'
        defaultValue={props.userModel.name}
        onChange={e => {setUserModelName(e.target.value)}} />

      <div className='flex items-center my-5'>
        <div className='flex-1'></div>
        <div className='flex-1 text-center'>
          <Button onClick={saveUserModel} disabled={saveButtonDisabled} className='max-w-[170px] mx-auto'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['floppy-disk']} className='mr-2' />
            Save
          </Button>
        </div>
        <div className='flex-1 text-end'>
          <Button
            onClick={() => setDeletionConfirmationModalVisible(true)}
            colorSet='red'
            className='max-w-[170px] mx-auto'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['trash']} className='text-white' />
          </Button>
          <DeletionConfirmationModal
            visible={deletionConfirmationModalVisible}
            onClose={() => setDeletionConfirmationModalVisible(false)}
            onConfirm={deleteUserModel} />
        </div>
      </div>

      <div className='text-center text-red-500'>{error}</div>
    </>
  );
};

export default EditUserModel;
