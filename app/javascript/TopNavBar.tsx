import React from "react";
import { User } from "./types/models";

function signOut() { window.location.assign('/sign_out') }
function signIn() { window.location.assign('/sign_in') }

const TopNavBar = ({ current_user }: { current_user: User; }) => {
  let greeting;
  if (current_user) {
    greeting = (
      <>
        <li className="nav-item">
          <a className="nav-link" href="#">{current_user.username}</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={signOut}>Sign Out</a>
        </li>
      </>
    );
  } else {
    greeting = (
      <>
        <li className="nav-item">
          <a className="nav-link" onClick={signIn}>Sign In</a>
        </li>
      </>
    );
  }

  return (
    <>
      <nav className="navbar navbar-expand-sm">
        <div className="container-fluid">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Model Explorer</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link 2</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Dropdown</a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Link</a></li>
                <li><a className="dropdown-item" href="#">Another link</a></li>
                <li><a className="dropdown-item" href="#">A third link</a></li>
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto"> 
              {greeting}
          </ul>
        </div>

      </nav>
    </>
  );
};

export default TopNavBar;
