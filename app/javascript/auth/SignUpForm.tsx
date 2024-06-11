import React, { useState, useEffect } from "react";
import { apiCall } from "../utils/helpers";

const SignUpForm = ({}: {}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [error, setError] = useState('');
  const [signUpButtonDisabled, setSignUpButtonDisabled] = useState(true);

  type InputTarget = { target: { value: string }};
  function handleChangeUsername(e: InputTarget) { setUsername(e.target.value) }
  function handleChangeEmail(e: InputTarget) { setEmail(e.target.value) }
  function handleChangePassword(e: InputTarget) { setPassword(e.target.value); }
  function handleChangeConfirmedPassword(e: InputTarget) { setConfirmedPassword(e.target.value); }

  useEffect(() => {
    setSignUpButtonDisabled(!(username !== '' && email !== '' && confirmedPassword !== '' && confirmedPassword === password));
    setError(confirmedPassword !== '' && confirmedPassword !== password ? 'Passwords don\'t match' : '');
  }, [username, email, password, confirmedPassword]);

  function signUp() {
    apiCall({
      endpoint: '/sign_up',
      method: 'POST',
      body: { username, email, password }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) throw new Error(body.error)
        window.location.assign('/')
      })
      .catch((err) => setError(err.message));
  }

  function signIn() {
    window.location.assign('/sign_in');
  }

  return (
    <>
      <div id='sign-up-form' className='container'>
        <h2 className='text-center mt-5'>Sign Up</h2>
        <div className='mb-3'>
          <label htmlFor="username">Username:</label>
          <input id='username' className='form-control' value={username} onChange={handleChangeUsername} required />
        </div>
        <div className='mb-3'>
          <label htmlFor="email">Email:</label>
          <input id='email' className='form-control' value={email} onChange={handleChangeEmail} required />
        </div>
        <div className='mb-3'>
          <label htmlFor="password">Password:</label>
          <input id='password' className='form-control' type='password' value={password} onChange={handleChangePassword} required />
        </div>
        <div className='mb-3'>
          <label htmlFor="password">Password Again:</label>
          <input id='confirmed-password' className='form-control' type='password' value={confirmedPassword} onChange={handleChangeConfirmedPassword} required />
        </div>
        
        <div className="error-message text-center text-danger mb-3">{error}</div>

        <div className='row'>
          <div className='col-sm-4'></div>
          <div className='col-sm-4 d-flex justify-content-center'>
            <button onClick={signUp} disabled={signUpButtonDisabled} className='btn btn-primary px-5 py-2'>Sign Up</button>
          </div>
          <div className='col-sm-4 d-flex justify-content-end'>
            <button onClick={signIn} className='btn btn-light'>Sign In</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
