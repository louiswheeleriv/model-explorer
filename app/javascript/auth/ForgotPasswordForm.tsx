import React, { useState, useEffect } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { apiCall } from "../utils/helpers";

const ForgotPasswordForm = ({}: {}) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  type InputTarget = { target: { value: string }};
  function handleChangeUsernameOrEmail(e: InputTarget) { setUsernameOrEmail(e.target.value) }

  useEffect(() => {
    setSubmitButtonDisabled(usernameOrEmail == null || usernameOrEmail === '');
  }, [usernameOrEmail]);

  function submitForgotPassword() {
    setMessage('');
    setError('');
    apiCall({
      endpoint: '/forgot-password',
      method: 'POST',
      body: {
        usernameOrEmail: usernameOrEmail
      }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error)
        setMessage('If a user was found with the provided details, a password reset email will have been sent.');
      })
      .catch((err) => setError(err.message));
  }

  function signIn() {
    window.location.assign('/sign-in');
  }

  function signUp() {
    window.location.assign('/sign-up');
  }

  return (
    <>
      <div id='forgot-password-form' className='px-6 py-8 max-w-[600px] mx-auto'>
        <h2 className='text-center my-5 text-4xl'>Forgot Password</h2>
        <div className='mb-3'>
          <Input placeholder='Username or Email' value={usernameOrEmail} onChange={handleChangeUsernameOrEmail} />
        </div>
        
        <div className="error-message text-center text-red-500 mb-3">{error}</div>
        <div className="message text-center text-white mb-3">{message}</div>

        <div className='flex'>
          <div className='flex-1'>
          <Button onClick={signUp} className='bg-transparent font-semibold'>Sign Up</Button>
          </div>
          <div className='flex-1 flex justify-center'>
            <Button onClick={submitForgotPassword} disabled={submitButtonDisabled} className='px-5'>Submit</Button>
          </div>
          <div className='flex-1 flex justify-end'>
            <Button onClick={signIn} className='bg-transparent font-semibold'>Sign In</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
