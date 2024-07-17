import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import Button from "../common/Button";
import Input from "../common/Input";
import { ProposedUserModelGroup } from "./ManageUserModelGroups";

type Props = {
  visible: boolean;
  group?: ProposedUserModelGroup;
  otherProposedGroups: ProposedUserModelGroup[];
  onSubmit: (origGroup: ProposedUserModelGroup, draftGroup: ProposedUserModelGroup) => void;
  onDelete: (group: ProposedUserModelGroup) => void;
  onClose: () => void;
  className?: string;
}

const EditUserModelGroupModal = (props: Props) => {
  const emptyGroup = { name: '' };

  const [draftGroup, setDraftGroup] = useState(props.group || emptyGroup);
  const [error, setError] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  function onSubmitButtonClick() {
    if (!draftGroup) throw 'No draft group provided.';
    if (!props.group) throw 'No old group provided.';

    props.onSubmit(props.group, draftGroup);
  }

  function onDeleteButtonClick() {
    if (!props.group) throw 'No old group provided.';

    props.onDelete(props.group);
  }

  function onCloseButtonClicked() {
    props.onClose();
  }

  useEffect(() => {
    if (draftGroup &&
        draftGroup.name.length > 0 &&
        props.otherProposedGroups.some((group) => group.name === draftGroup.name)) {
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

  const componentId = 'edit-group-modal';

  return (
    <div
      id={componentId}
      tabIndex={-1}
      className={'overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 justify-center flex items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full transition-all duration-250 '+(props.visible ? 'opacity-1 z-5' : 'opacity-0 -z-50')}>

      <div className="relative m-auto p-4 w-full max-w-md max-h-full">
        <div className="relative rounded-lg shadow bg-gray-700">
          
          <div className='p-4 border-b border-gray-600 modal-header'>
            <div className="flex items-center justify-between rounded-t">
              <h3 className="text-lg font-semibold">
                Edit Model Group
              </h3>
              <button type="button" onClick={onCloseButtonClicked} className="bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white">
                <FontAwesomeIcon icon={byPrefixAndName.fas['xmark']} />
              </button>
            </div>
          </div>

          <div className='p-4 modal-content'>
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
                  <FontAwesomeIcon icon={byPrefixAndName.fas['layer-plus']} className='mr-2' />
                  Submit
                </Button>
              </div>
              <div className='flex-1 text-end'>
                <Button onClick={onDeleteButtonClick} disabled={submitButtonDisabled} className='max-w-[170px] mx-auto bg-red-500'>
                  <FontAwesomeIcon icon={byPrefixAndName.fas['trash']} className='text-white' />
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

export default EditUserModelGroupModal;
