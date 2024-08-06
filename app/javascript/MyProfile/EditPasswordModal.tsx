import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import Button from "../common/Button";
import Input from "../common/Input";
import { apiCall } from "../utils/helpers";
import Modal from "../common/Modal";

type Props = {
  onClose: () => void;
  visible: boolean;
  className?: string;
}

const EditPasswordModal = (props: Props) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmed, setNewPasswordConfirmed] = useState('');
  const [error, setError] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  function onSubmitButtonClick() {
    apiCall({
      endpoint: '/my-profile/password',
      method: 'PUT',
      body: {
        current_password: currentPassword,
        new_password: newPassword
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
    if (currentPassword && newPassword && newPassword === newPasswordConfirmed) {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  }, [currentPassword, newPassword, newPasswordConfirmed]);

  return (
    <Modal
      id='edit-password-modal'
      headerText='Edit Password'
      visible={props.visible}
      onClose={props.onClose}>

      <div className='mb-4'>
        <div className="mb-2 text-sm font-medium">Current Password</div>
        <Input
          type='password'
          value={currentPassword}
          onChange={e => setCurrentPassword(e.target.value)}
          className='mt-5' />
      </div>
      <div className='mb-4'>
        <div className="mb-2 text-sm font-medium">New Password</div>
        <Input
          type='password'
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          className='mt-5' />
      </div>
      <div className='mb-4'>
        <div className="mb-2 text-sm font-medium">Confirm New Password</div>
        <Input
          type='password'
          value={newPasswordConfirmed}
          onChange={e => setNewPasswordConfirmed(e.target.value)}
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

export default EditPasswordModal;
