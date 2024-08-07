import React, { useState, useEffect } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { apiCall } from "../utils/helpers";

const SignUpForm = ({}: {}) => {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [error, setError] = useState('');
  const [signUpButtonDisabled, setSignUpButtonDisabled] = useState(true);

  type InputTarget = { target: { value: string }};
  function handleChangeUsername(e: InputTarget) { setUsername(e.target.value) }
  function handleChangeDisplayName(e: InputTarget) { setDisplayName(e.target.value) }
  function handleChangeEmail(e: InputTarget) { setEmail(e.target.value) }
  function handleChangePassword(e: InputTarget) { setPassword(e.target.value); }
  function handleChangeConfirmedPassword(e: InputTarget) { setConfirmedPassword(e.target.value); }

  function acceptableUsername(username: string) {
    return /^[a-zA-Z0-9]+$/.test(username);
  }

  function acceptableEmail(email: string) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }

  useEffect(() => {
    setSignUpButtonDisabled(!(acceptableUsername(username) && acceptableEmail(email) && confirmedPassword !== '' && confirmedPassword === password));
    setError(confirmedPassword !== '' && confirmedPassword !== password ? 'Passwords don\'t match' : '');
  }, [username, email, password, confirmedPassword]);

  function signUp() {
    apiCall({
      endpoint: '/sign-up',
      method: 'POST',
      body: {
        username: username,
        display_name: displayName,
        email: email,
        password: password
      }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error)
        window.location.assign('/')
      })
      .catch((err) => setError(err.message));
  }

  function signIn() {
    window.location.assign('/sign-in');
  }

  return (
    <>
      <div id='sign-up-form' className='px-6 py-8 max-w-[600px] mx-auto'>
        <h2 className='text-center my-5 text-4xl'>Sign Up</h2>
        <div className='mb-3'>
          <Input placeholder='Username (alphanumeric only)' value={username} onChange={handleChangeUsername} />
        </div>
        <div className='mb-3'>
          <Input placeholder='(Optional) Display Name' value={displayName} onChange={handleChangeDisplayName} />
        </div>
        <div className='mb-3'>
          <Input placeholder='Email' value={email} onChange={handleChangeEmail} />
        </div>
        <div className='mb-3'>
          <Input type='password' placeholder='Password' value={password} onChange={handleChangePassword} />
        </div>
        <div className='mb-3'>
          <Input type='password' placeholder='Confirm Password' value={confirmedPassword} onChange={handleChangeConfirmedPassword} />
        </div>
        
        <div className="error-message text-center text-red-500 mb-3">{error}</div>

        <div className='flex'>
          <div className='flex-1'></div>
          <div className='flex-1 flex justify-center'>
            <Button onClick={signUp} disabled={signUpButtonDisabled} className='px-5'>Sign Up</Button>
          </div>
          <div className='flex-1 flex justify-end'>
            <Button onClick={signIn} className='bg-transparent font-semibold'>Sign In</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
