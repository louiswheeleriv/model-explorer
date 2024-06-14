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
            <svg width="32px" height="32px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" className="iconify iconify--emojione" preserveAspectRatio="xMidYMid meet"><path d="M49.6 23.6C58.4 8.5 40.3-1.3 17.3 9.2C3.2 15.7-6.6 35.7 13 52.9c13.9 12.2 49 5.3 49-8.7c0-15.5-21.7-4.8-12.4-20.6m4.9 24.6c-2.8 2.4-7.2 2.4-10 0s-2.8-4.5 0-6.9c2.8-2.4 7.2-2.4 10 0s2.7 4.5 0 6.9" fill="#f6c799"></path><path d="M33.2 45.1c-3.1-2.4-8-2.4-11.1 0c-3.1 2.4-3.1 6.2 0 8.6s8 2.4 11.1 0c3-2.4 3-6.3 0-8.6" fill="#2caece"></path><path d="M19.6 33.6c-3.4-1.6-8-.6-10.4 2.3c-2.4 2.9-1.6 6.5 1.8 8.1c3.4 1.6 8 .6 10.4-2.3c2.4-2.9 1.6-6.5-1.8-8.1" fill="#fdf516"></path><path d="M17 20.6c-2.9-1.6-7.2-.9-9.4 1.6c-2.3 2.5-1.7 5.8 1.2 7.3c2.9 1.6 7.2.9 9.4-1.6s1.7-5.7-1.2-7.3" fill="#f55"></path><path d="M28.4 10.8c-2.8-1.6-6.9-1-9.1 1.4s-1.8 5.5 1.1 7.1c2.8 1.6 6.9 1 9.1-1.4s1.7-5.6-1.1-7.1" fill="#83bf4f"></path><path d="M44.7 9.7c-2.2-1.8-5.9-2.2-8.5-1c-2.5 1.2-2.8 3.7-.6 5.5c2.2 1.8 5.9 2.2 8.5 1c2.5-1.3 2.7-3.7.6-5.5" fill="#9156b7"></path><path d="M40 42.1c-1.9 2.1-11.5 4-11.5 4s3.8-3.5 5.5-9.2c.8-2.7 4.7-2.7 6.4-1.2c1.7 1.4 1.5 4.3-.4 6.4" fill="#947151"></path><path d="M58.7 12.3c1-.1 2.9 1.6 3 2.5C62 19.1 44 34.5 44 34.5L41 32s13.3-19.4 17.7-19.7" fill="#666"></path><path fill="#ccc" d="M38.4 34.9l3 2.5l2.6-2.9l-3-2.5z"></path></svg>
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
