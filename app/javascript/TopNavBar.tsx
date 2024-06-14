import React from "react";
import { User } from "./types/models";
import $ from 'jquery';


const TopNavBar = ({ current_user }: { current_user: User; }) => {

  let profileButton = (
    <>
      <a href="#" className="block py-2 px-3 rounded md:border-0 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent">Profile</a>
    </>
  );
  let signOutButton = (
    <>
      <a href='/sign_out' className='block py-2 px-3 rounded md:border-0 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent'>Sign Out</a>
    </>
  );
  let signInButton = (
    <>
      <a href='/sign_in' className='block py-2 px-3 rounded md:border-0 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent'>Sign In</a>
    </>
  );
  let signUpButton = (
    <>
      <a href='/sign_up' className='block py-2 px-3 rounded md:border-0 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent'>Sign Up</a>
    </>
  );

  let menuButtons;
  if (current_user) {
    menuButtons = (
      <>
        <li>{profileButton}</li>
        <li>{signOutButton}</li>
      </>
    );
  } else {
    menuButtons = (
      <>
        <li>{signInButton}</li>
        <li>{signUpButton}</li>
      </>
    );
  }

  function toggleDropdown() {
    $('#navbar-menu').toggle();
  }

  return (
    <>
      <nav className="bg-gray-900 border-gray-200">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">Model Explorer</span>
          </a>
          <button type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 hover:bg-gray-700 focus:ring-gray-600" onClick={toggleDropdown}>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-menu">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
              {menuButtons}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopNavBar;
