import React, { useState } from "react";

const SignInForm = ({}: {}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleChangeUsername(e: { target: { value: string }}) { setUsername(e.target.value) }
  function handleChangePassword(e: { target: { value: string }}) { setPassword(e.target.value) }

  function signIn() {
    console.log('Signing in as ' + username + ':' + password);
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
