import React, { useState } from "react";
import { apiCall } from "../utils/helpers";

const SignInForm = ({}: {}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  type InputTarget = { target: { value: string }};
  function handleChangeUsername(e: InputTarget) { setUsername(e.target.value) }
  function handleChangePassword(e: InputTarget) { setPassword(e.target.value) }

  function signIn() {
    apiCall({
      endpoint: '/sign_in',
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
    window.location.assign('/sign_up');
  }

  return (
    <>
      <div id='sign-in-form' className='px-6 py-8 max-w-[600px] mx-auto'>
        <h2 className='text-center my-5 text-4xl'>Sign In</h2>
        <div className='mb-3'>
          <input id='username' type='text' placeholder='Username' value={username} onChange={handleChangeUsername} required className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' />
        </div>
        <div className='mb-3'>
          <input id='password' type='password' placeholder='Password' value={password} onChange={handleChangePassword} required className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' />
        </div>

        <div className="error-message text-center text-red mb-3">{error}</div>

        <div className='flex'>
          <div className='flex-1'></div>
          <div className='flex-1 flex justify-center'>
            <button onClick={signIn} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded'>Sign In</button>
          </div>
          <div className='flex-1 flex justify-end'>
            <button onClick={signUp} className='bg-transparent text-white font-semibold py-2 px-4 rounded'>Sign Up</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
