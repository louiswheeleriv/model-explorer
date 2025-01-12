import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import Button from "./Button";
import Modal from "./Modal";

type Props = {
  visible: boolean;
  zIndex?: number;
  onClose: () => void;
};

const NotSignedInModal = (props: Props) => {
  const zIndex = props.zIndex || 10;

  return (
    <Modal
      headerText='Not Signed In'
      visible={props.visible}
      onClose={props.onClose}>
      
      <div className='text-left'>
        <div className='mb-5'>
          It looks like you aren't signed in!
        </div>
        <div className='mb-5'>
          Sign in or create a free account to access all of MiniPainter's features ✨
        </div>
      </div>

      <div className='text-center mb-5'>
        <Button
          onClick={() => window.location.assign('/users/sign_up')}
          className='max-w-[170px] mr-5'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['user-plus']} className='mr-2' />
            Sign Up
        </Button>
        <Button
          onClick={() => window.location.assign('/users/sign_in')}
          className='max-w-[170px]'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['key']} className='mr-2' />
            Sign In
        </Button>
      </div>
    </Modal>
  );
};

export default NotSignedInModal;
