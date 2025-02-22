import React, { useState, useEffect } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { apiCall } from "../utils/helpers";

const SignInForm = ({}: {}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [signInButtonDisabled, setSignInButtonDisabled] = useState(true);

  type InputTarget = { target: { value: string }};
  function handleChangeUsername(e: InputTarget) { setUsername(e.target.value) }
  function handleChangePassword(e: InputTarget) { setPassword(e.target.value) }

  useEffect(() => {
    setSignInButtonDisabled(username === '' || password === '');
  }, [username, password]);

  function signIn() {
    apiCall({
      endpoint: '/sign-in',
      method: 'POST',
      body: { username, password }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error)
        window.location.assign('/')
      })
      .catch((err) => setError(err.message));
  }

  function signUp() {
    window.location.assign('/sign-up');
  }

  function forgotPassword() {
    window.location.assign('/forgot-password');
  }

  return (
    <div id='sign-in-form' className='px-6 py-8 max-w-[600px] mx-auto'>
      <h2 className='text-center my-5 text-4xl'>Sign In</h2>
      <div className='mb-3'>
        <Input placeholder='Username' value={username} onChange={handleChangeUsername} />
      </div>
      <div className='mb-3'>
        <Input type='password' placeholder='Password' value={password} onChange={handleChangePassword} />
      </div>

      <div className="error-message text-center text-red-500 mb-3">{error}</div>

      <div className='flex'>
        <div className='flex-1'>
          <Button onClick={forgotPassword} className='bg-transparent font-semibold'>Forgot Password</Button>
        </div>
        <div className='flex-1 flex justify-center'>
          <Button onClick={signIn} disabled={signInButtonDisabled} className='px-5'>Sign In</Button>
        </div>
        <div className='flex-1 flex justify-end'>
          <Button onClick={signUp} className='bg-transparent font-semibold'>Sign Up</Button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
