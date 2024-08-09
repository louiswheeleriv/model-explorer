import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import Button from "../../common/Button";
import Input from "../../common/Input";
import Modal from "../../common/Modal";
import { ProposedUserModelGroup } from "./UserFactionGroupsDraggableItem";
import { generateUuid } from "../../utils/helpers";

type Props = {
  visible: boolean;
  group?: ProposedUserModelGroup;
  groups: ProposedUserModelGroup[];
  onSubmit: (group: ProposedUserModelGroup) => void;
  onDelete: (group: ProposedUserModelGroup) => void;
  onClose: () => void;
  className?: string;
}

const EditUserModelGroupModal = (props: Props) => {
  const emptyGroup = {
    id: generateUuid(),
    userModelGroupId: undefined,
    name: ''
  };

  const [draftGroup, setDraftGroup] = useState(props.group || emptyGroup);
  const [error, setError] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  function onSubmitButtonClick() {
    if (!draftGroup) throw 'No draft group provided.';

    props.onSubmit(draftGroup);
  }

  function onDeleteButtonClick() {
    if (!props.group) throw 'No old group provided.';

    props.onDelete(props.group);
  }

  useEffect(() => {
    if (draftGroup &&
        draftGroup.name.length > 0 &&
        props.groups.some((group) => group.id !== draftGroup.id && group.name === draftGroup.name)) {
      setError('Group '+draftGroup.name+' already exists.');
      setSubmitButtonDisabled(true);
    } else {
      setError('');
      setSubmitButtonDisabled(false);
    }
  }, [draftGroup?.name]);

  useEffect(() => {
    setDraftGroup(props.group || emptyGroup);
  }, [props.group]);

  return (
    <Modal
      id='edit-group-modal'
      headerText='Edit Model Group'
      visible={props.visible}
      onClose={props.onClose}>

      <div className='mb-4'>
        <div className="mb-2 text-sm font-medium">Group Name</div>
        <Input
          id='edit-group-modal-name'
          placeholder='e.g. Infantry'
          value={draftGroup.name}
          onChange={e => setDraftGroup({ ...draftGroup, name: e.target.value })}
          className='mt-5' />
      </div>

      <div className='flex items-center mb-5'>
        <div className='flex-1'></div>
        <div className='flex-1 text-center'>
          <Button onClick={onSubmitButtonClick} disabled={submitButtonDisabled} className='max-w-[170px] mx-auto'>
            Done
          </Button>
        </div>
        <div className='flex-1 text-end'>
          <Button onClick={onDeleteButtonClick} disabled={submitButtonDisabled} className='max-w-[170px] mx-auto bg-red-500'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['trash']} className='text-white' />
          </Button>
        </div>
      </div>

      <div className='text-center text-red-500'>{error}</div>
    </Modal>
  );
};

export default EditUserModelGroupModal;
