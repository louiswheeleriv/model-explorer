import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import Button from "../common/Button";
import Input from "../common/Input";
import { ProposedUserModelGroup } from "./UserFactionGroups";

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

  function onCloseButtonClick() {
    props.onClose();
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
    <div
      id="add-group-modal"
      tabIndex={-1}
      className={'overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 justify-center flex items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full transition-all duration-250 '+(props.visible ? 'opacity-1 z-5' : 'opacity-0 -z-50')}>

      <div className="relative m-auto p-4 w-full max-w-md max-h-full">
        <div className="relative rounded-lg shadow bg-gray-700">
          
          <div className='p-4 border-b border-gray-600 modal-header'>
            <div className="flex items-center justify-between rounded-t">
              <h3 className="text-lg font-semibold">
                Add Model Group
              </h3>
              <button type="button" onClick={onCloseButtonClick} className="bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white">
                <FontAwesomeIcon icon={byPrefixAndName.fas['xmark']} />
              </button>
            </div>
          </div>

          <div className='p-4 modal-content'>
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

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModelGroupModal;