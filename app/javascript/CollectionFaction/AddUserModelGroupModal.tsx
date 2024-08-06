import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import Button from "../common/Button";
import Input from "../common/Input";
import { ProposedUserModelGroup } from "./UserFactionGroups";
import Modal from "../common/Modal";

type Props = {
  visible: boolean;
  proposedGroups: ProposedUserModelGroup[];
  onSubmit: (group: ProposedUserModelGroup) => void;
  onClose: () => void;
  className?: string;
}

const AddUserModelGroupModal = (props: Props) => {
  const emptyGroup = { name: '' };

  const [proposedGroup, setProposedGroup] = useState(emptyGroup);
  const [error, setError] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  function onSubmitButtonClick() {
    props.onSubmit(proposedGroup);
    setProposedGroup(emptyGroup);
  }

  useEffect(() => {
    if (proposedGroup.name.length > 0 && props.proposedGroups.some((group) => group.name === proposedGroup.name)) {
      setError('Group '+proposedGroup.name+' already exists.');
      setSubmitButtonDisabled(true);
    } else {
      setError('');
      setSubmitButtonDisabled(false);
    }
  }, [proposedGroup]);

  return (
    <Modal
      id='add-group-modal'
      headerText='Add Model Group'
      visible={props.visible}
      onClose={props.onClose}>

      <div className='mb-4'>
        <Input
          placeholder='e.g. Infantry'
          value={proposedGroup.name}
          onChange={e => setProposedGroup({ ...proposedGroup, name: e.target.value })}
          className='mt-5' />
      </div>

      <div className='flex items-center mb-5'>
        <Button onClick={onSubmitButtonClick} disabled={submitButtonDisabled} className='max-w-[170px] mx-auto'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['layer-plus']} className='mr-2' />
          Add Group
        </Button>
      </div>

      <div className='text-center text-red-500'>{error}</div>
    </Modal>
  );
};

export default AddUserModelGroupModal;
