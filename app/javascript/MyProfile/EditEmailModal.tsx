import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import Button from "../common/Button";
import Input from "../common/Input";
import { acceptableEmail, apiCall } from "../utils/helpers";
import Modal from "../common/Modal";

type Props = {
  currentEmail: string;
  onClose: () => void;
  visible: boolean;
  className?: string;
}

const EditEmailModal = (props: Props) => {
  const [proposedEmail, setProposedEmail] = useState(props.currentEmail);
  const [error, setError] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  function onSubmitButtonClick() {
    apiCall({
      endpoint: '/my-profile/email',
      method: 'PUT',
      body: {
        email: proposedEmail
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
    if (proposedEmail && proposedEmail !== props.currentEmail && acceptableEmail(proposedEmail)) {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  }, [proposedEmail]);

  return (
    <Modal
      id='edit-email-modal'
      headerText='Edit Email'
      visible={props.visible}
      onClose={props.onClose}>

      <div className='mb-4'>
        <div className="mb-2 text-sm font-medium">Email</div>
        <Input
          value={proposedEmail}
          onChange={e => setProposedEmail(e.target.value)}
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

export default EditEmailModal;
