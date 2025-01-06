import React, { useState, useEffect } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { apiCall } from "../utils/helpers";

type Props = {
  password_reset_code: string;
  password_reset_code_found: boolean;
  password_reset_code_valid: boolean;
  username?: string;
};

const PasswordResetForm = (props: Props) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  type InputTarget = { target: { value: string }};
  function handleChangeNewPassword(e: InputTarget) { setNewPassword(e.target.value) }
  function handleChangeConfirmNewPassword(e: InputTarget) { setConfirmNewPassword(e.target.value) }

  useEffect(() => {
    setSubmitButtonDisabled(!(newPassword != null && confirmNewPassword != null && newPassword === confirmNewPassword));
    setError(confirmNewPassword !== '' && confirmNewPassword !== newPassword ? 'Passwords don\'t match' : '');
  }, [newPassword, confirmNewPassword]);

  function submitPasswordReset() {
    setMessage('');
    setError('');
    apiCall({
      endpoint: '/password-reset',
      method: 'POST',
      body: {
        code: props.password_reset_code,
        password: newPassword
      }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error)
        setMessage('Your password has been updated. You can now sign in using your new password.');
      })
      .catch((err) => setError(err.message));
  }

  function signIn() {
    window.location.assign('/sign-in');
  }

  return (
    <div id='password-reset-form' className='px-6 py-8 max-w-[600px] mx-auto'>
      {props.password_reset_code_found && props.password_reset_code_valid &&
        <>
          <h2 className='text-center my-5 text-4xl'>Change Password</h2>
          <div className='mb-3'>
            <Input value={props.username} disabled={true} />
          </div>
          <div className='mb-3'>
            <Input placeholder='New Password' type='password' value={newPassword} onChange={handleChangeNewPassword} />
          </div>
          <div className='mb-3'>
            <Input placeholder='Confirm New Password' type='password' value={confirmNewPassword} onChange={handleChangeConfirmNewPassword} />
          </div>
          
          <div className="error-message text-center text-red-500 mb-3">{error}</div>
          <div className="message text-center text-white mb-3">{message}</div>

          <div className='flex'>
            <div className='flex-1'></div>
            <div className='flex-1 flex justify-center'>
              <Button onClick={submitPasswordReset} disabled={submitButtonDisabled} className='px-5'>Change Password</Button>
            </div>
            <div className='flex-1 flex justify-end'>
              <Button onClick={signIn} className='bg-transparent font-semibold'>Sign In</Button>
            </div>
          </div>
        </>
      }
      {props.password_reset_code_found && !props.password_reset_code_valid &&
        <>
          <h2 className='text-center my-5 text-4xl'>Password reset link expired</h2>
        </>
      }
      {!props.password_reset_code_found &&
        <>
          <h2 className='text-center my-5 text-4xl'>Password reset link invalid</h2>
        </>
      }
    </div>
  );
};

export default PasswordResetForm;
