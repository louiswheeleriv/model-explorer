import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import Button from "../common/Button";

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeletionConfirmationModal = (props: Props) => {
  return (
    <div
      id="deletion-confirmation-modal"
      tabIndex={-1}
      className={'overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 justify-center flex items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full transition-all duration-250 '+(props.visible ? 'opacity-1 z-5' : 'opacity-0 -z-50')}>

      <div className="relative m-auto p-4 w-full max-w-md max-h-full">
        <div className="relative rounded-lg shadow bg-gray-700">
          
          <div className='p-4 border-b border-gray-600 modal-header'>
            <div className="flex items-center justify-between rounded-t">
              <h3 className="text-lg font-semibold">
                Confirm Deletion?
              </h3>
              <button type="button" onClick={props.onClose} className="bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white">
                <FontAwesomeIcon icon={byPrefixAndName.fas['xmark']} />
              </button>
            </div>
          </div>

          <div className='p-4 modal-content'>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletionConfirmationModal;
