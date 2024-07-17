import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';

type Props = {

};

const Welcome = (props: Props) => {
  return (
    <div className='px-6 py-8 max-w-[600px] mx-auto'>
      <h2 className='text-center text-2xl mb-[50px]'>
        <FontAwesomeIcon icon={byPrefixAndName.fas['dice']} />
        <span className='mx-4'>Welcome to Model Explorer!</span>
        <FontAwesomeIcon icon={byPrefixAndName.fas['paintbrush-fine']} />
      </h2>
      <p className='text-center mb-5'>
        Model Explorer is a tool for you to manage and display your collection of miniatures, and explore those of your friends.
      </p>
      <p className='text-center'>
        Many features are still in development. Check back often for updates!
      </p>
    </div>
  );
};

export default Welcome;
