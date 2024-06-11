import React, { useState, useEffect } from "react";

const SignUpForm = ({}: {}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [error, setError] = useState('');
  const [signUpButtonDisabled, setSignUpButtonDisabled] = useState(true);

  function handleChangeUsername(e: { target: { value: string }}) { setUsername(e.target.value) }
  function handleChangePassword(e: { target: { value: string }}) { setPassword(e.target.value); }
  function handleChangeConfirmedPassword(e: { target: { value: string }}) { setConfirmedPassword(e.target.value); }

  useEffect(() => {
    setSignUpButtonDisabled(!(username !== '' && confirmedPassword !== '' && confirmedPassword === password));
    setError(confirmedPassword !== '' && confirmedPassword !== password ? 'Passwords don\'t match' : '');
  }, [username, password, confirmedPassword]);

  function signUp() {
    console.log('Signing up as ' + username + ':' + password);
  }

  return (
    <>
      <div>
        <input name='username' value={username} onChange={handleChangeUsername} required />
        <input name='password' type='password' value={password} onChange={handleChangePassword} required />
        <input name='confirmed-password' type='password' value={confirmedPassword} onChange={handleChangeConfirmedPassword} required />
        <div className="error-message">{error}</div>
        <button onClick={signUp} disabled={signUpButtonDisabled}>Sign Up</button>
      </div>
    </>
  );
};

export default SignUpForm;
