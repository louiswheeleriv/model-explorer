import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';

type Props = {

};

const Welcome = (props: Props) => {
  return (
    <div className='px-6 py-8 max-w-[600px] mx-auto'>
      <div className='flex justify-center mb-[50px]'>
        <div className='flex-none my-auto mr-3'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['dice']} size='xl' />
        </div>
        <div className='flex-1 text-2xl text-center my-auto max-w-[300px]'>
          Welcome to Model Explorer!
        </div>
        <div className='flex-none my-auto ml-3'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['paintbrush-fine']} size='xl' />
        </div>
      </div>
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
