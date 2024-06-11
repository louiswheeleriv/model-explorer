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

  return (
    <>
      <div>
        <input name='username' value={username} onChange={handleChangeUsername} required />
        <input name='email' value={email} onChange={handleChangeEmail} required />
        <input name='password' type='password' value={password} onChange={handleChangePassword} required />
        <input name='confirmed-password' type='password' value={confirmedPassword} onChange={handleChangeConfirmedPassword} required />
        <div className="error-message">{error}</div>
        <button onClick={signUp} disabled={signUpButtonDisabled}>Sign Up</button>
      </div>
    </>
  );
};

export default SignUpForm;
