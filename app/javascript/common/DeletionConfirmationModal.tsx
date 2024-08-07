import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import Button from "../common/Button";
import Modal from "./Modal";

type Props = {
  visible: boolean;
  bodyText?: string;
  onClose: () => void;
  onConfirm: () => void;
};

const DeletionConfirmationModal = (props: Props) => {
  return (
    <Modal
      id='deletion-confirmation-modal'
      headerText='Confirm Deletion?'
      visible={props.visible}
      onClose={props.onClose}>
      
      {props.bodyText != null &&
        <div className='mb-5 text-left'>
          {props.bodyText}
        </div>
      }

      <div className='flex mb-5'>
        <div className='flex-1 text-center'>
          <Button
            onClick={props.onClose}
            colorSet='lightgray'
            className='max-w-[170px] mx-auto mr-5'>
              <FontAwesomeIcon icon={byPrefixAndName.fas['xmark']} className='mr-2' />
              Cancel
          </Button>
          <Button
            onClick={props.onConfirm}
            colorSet='red'
            className='max-w-[170px] mx-auto'>
              <FontAwesomeIcon icon={byPrefixAndName.fas['trash']} className='mr-2' />
              Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeletionConfirmationModal;
