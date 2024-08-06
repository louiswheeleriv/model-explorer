import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import Button from "../common/Button";
import { apiCall } from "../utils/helpers";
import TextArea from "../common/TextArea";
import Modal from "../common/Modal";

type Props = {
  currentBio?: string;
  onClose: () => void;
  visible: boolean;
  className?: string;
}

const EditBioModal = (props: Props) => {
  const [proposedBio, setProposedBio] = useState(props.currentBio || '');
  const [error, setError] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  function onSubmitButtonClick() {
    apiCall({
      endpoint: '/my-profile/bio',
      method: 'PUT',
      body: {
        bio: proposedBio
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
    if (proposedBio !== props.currentBio) {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  }, [proposedBio]);

  return (
    <Modal
      id='edit-bio-modal'
      headerText='Edit Bio'
      visible={props.visible}
      onClose={props.onClose}>

      <div className='mb-4'>
        <div className="mb-2 text-sm font-medium">Bio</div>
        <TextArea
          value={proposedBio}
          onChange={e => setProposedBio(e.target.value)}
          className='mt-5'/>
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

export default EditBioModal;
