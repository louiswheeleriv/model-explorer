import React, { PropsWithChildren } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';

type Props = {
  visible: boolean;
  headerText: string;
  onClose: () => void;
  id?: string;
  className?: string;
};

const Modal = (props: PropsWithChildren<Props>) => {
  return (
    <div
      tabIndex={-1}
      className={
        'overflow-y-auto overflow-x-hidden '+
        'fixed top-0 right-0 left-0 justify-center '+
        'flex items-center w-full h-full md:inset-0 '+
        'max-h-full transition-all duration-250 '+
        'bg-[rgba(0,0,0,0.85)] '+
        (props.visible ? 'opacity-1 z-10' : 'opacity-0 -z-10')}>

      <div className="relative m-auto p-4 w-full max-w-md max-h-full">
        <div className="relative rounded-lg shadow bg-gray-700">
          
          <div className='p-4 border-b border-gray-600 modal-header'>
            <div className="flex items-center justify-between rounded-t">
              <h3 className="text-lg font-semibold">
                {props.headerText}
              </h3>
              <button type="button" onClick={props.onClose} className="bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white">
                <FontAwesomeIcon icon={byPrefixAndName.fas['xmark']} />
              </button>
            </div>
          </div>

          <div className='p-4 modal-content'>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
