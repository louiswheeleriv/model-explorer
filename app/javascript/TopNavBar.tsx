import React from "react";
import { User } from "./types/models";

function signOut() {
  console.log('signing out');
}

function signIn() {
  console.log('signing in');
}

const TopNavBar = ({ current_user }: { current_user: User; }) => {
  let greeting;
  if (current_user) {
    greeting = (
      <>
        current_user.username
        <button onClick={signOut}>Sign Out</button>
      </>
    );
  } else {
    greeting = (
      <>
        <button onClick={signIn}>Sign In</button>
      </>
    );
  }

  return (
    <>
      <div className="top-navbar">
        <a href="/">Home</a>
        {greeting}
      </div>
    </>
  );
};

export default TopNavBar;
