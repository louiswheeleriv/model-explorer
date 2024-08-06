import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import Button from "../common/Button";
import Input from "../common/Input";
import { apiCall } from "../utils/helpers";
import Modal from "../common/Modal";

type Props = {
  currentDisplayName: string;
  onClose: () => void;
  visible: boolean;
  className?: string;
}

const EditDisplayNameModal = (props: Props) => {
  const [proposedDisplayName, setProposedDisplayName] = useState(props.currentDisplayName || '');
  const [error, setError] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  function onSubmitButtonClick() {
    apiCall({
      endpoint: '/my-profile/display-name',
      method: 'PUT',
      body: {
        display_name: proposedDisplayName
      }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) {
          setError(body.error || body.exception);
        } else {
          location.reload();
        }
      });
  }

  useEffect(() => {
    if (proposedDisplayName && proposedDisplayName !== props.currentDisplayName) {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  }, [proposedDisplayName]);

  return (
    <Modal
      id='edit-display-name-modal'
      headerText='Edit Display Name'
      visible={props.visible}
      onClose={props.onClose}>

      <div className='mb-4'>
        <div className="mb-2 text-sm font-medium">Display Name</div>
        <Input
          value={proposedDisplayName}
          onChange={e => setProposedDisplayName(e.target.value)}
          className='mt-5' />
      </div>

      <div className='flex items-center mb-5'>
        <Button onClick={onSubmitButtonClick} disabled={submitButtonDisabled} className='max-w-[170px] mx-auto'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['floppy-disk']} className='mr-2' />
          Save
        </Button>
      </div>

      <div className='text-center text-red-500'>{error}</div>
    </Modal>
  );
};

export default EditDisplayNameModal;
