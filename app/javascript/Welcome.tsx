import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';

const Welcome = ({}: {}) => {
  return (
    <>
      <div className='px-6 py-8 max-w-[600px] mx-auto'>
        <h2 className='text-center text-2xl mb-[50px]'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['dice']} />
          <span className='mx-4'>Welcome to Model Explorer!</span>
          <FontAwesomeIcon icon={byPrefixAndName.fas['paintbrush-fine']} />
        </h2>
        <p className='text-center'>
          This page is a work in progress, come back soon!
        </p>
      </div>
    </>
  );
};

export default Welcome;
