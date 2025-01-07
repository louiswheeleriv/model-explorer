import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import Button from "./common/Button";
import { Carousel } from "flowbite-react";

type Props = {

};

const Welcome = (props: Props) => {

  function goToSocial() {
    window.location.assign('/social');
  }

  function signUp() {
    window.location.assign('/sign-up');
  }

  return (
    <div className='px-6 py-8 max-w-[600px] mx-auto'>
      <div className='flex justify-center mb-[50px]'>
        <div className='flex-none my-auto mr-3'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['dice']} size='xl' />
        </div>
        <div className='flex-1 text-2xl text-center my-auto max-w-[300px]'>
          Welcome to MiniPainter!
        </div>
        <div className='flex-none my-auto ml-3'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['paintbrush-fine']} size='xl' />
        </div>
      </div>
      <p className='text-center mb-5'>
        MiniPainter is a tool to manage and display your collection of miniatures, and explore those of your friends.
      </p>

      <div className='text-center mb-5'>
        <Button onClick={goToSocial} className='px-5'>View Collections</Button>
      </div>
      <div className='text-center mb-2'>
        <Button onClick={signUp} className='px-5'>Get Started for Free</Button>
      </div>
      
      <Carousel slide={true} className='h-[400px]'>
        <img
          src='/images/landing_page_my_collection.png'
          className='object-contain max-w-[75%] max-h-[100%]'
          style={{
            width: '70%'
          }}></img>
        <img
          src='/images/landing_page_space_cadets.png'
          className='object-contain max-w-[75%] max-h-[100%]'
          style={{
            width: '70%'
          }}></img>
        <img
          src='/images/landing_page_riflemen.png'
          className='object-contain max-w-[75%] max-h-[100%]'
          style={{
            width: '70%'
          }}></img>
      </Carousel>
    </div>
  );
};

export default Welcome;
