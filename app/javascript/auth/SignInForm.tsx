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

  return (
    <>
      <div>
        <div className="error-message">{error}</div>
        <input id='username' name='username' value={username} onChange={handleChangeUsername} required />
        <input id='password' name='password' type='password' value={password} onChange={handleChangePassword} required />
        <button onClick={signIn}>Sign In</button>
      </div>
    </>
  );
};

export default SignInForm;
