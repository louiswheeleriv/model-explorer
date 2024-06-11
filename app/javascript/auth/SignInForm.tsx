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
      <div id='sign-in-form' className='container'>
        <h2 className='text-center mt-5'>Sign In</h2>
        <div className='mb-3'>
          <label htmlFor="username">Username:</label>
          <input id='username' className='my-input form-control' type='text' name='username' value={username} onChange={handleChangeUsername} required />
        </div>
        <div className='mb-3'>
          <label htmlFor="password">Password:</label>
          <input id='password' className='my-input form-control' type='password' name='password' value={password} onChange={handleChangePassword} required />
        </div>

        <div className="error-message text-center text-danger mb-3">{error}</div>

        <div className='row'>
          <div className='col-sm-4'></div>
          <div className='col-sm-4 d-flex justify-content-center'>
            <button onClick={signIn} className='btn btn-primary px-5 py-2'>Sign In</button>
          </div>
          <div className='col-sm-4 d-flex justify-content-end'>
            <button onClick={signUp} className='btn'>Sign Up</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
