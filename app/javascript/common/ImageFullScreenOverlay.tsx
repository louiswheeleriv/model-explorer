import React from "react";

type Props = {
  imageUrl: string;
  visible: boolean;
  onClose: () => void;
  className?: string;
};

const ImageFullScreenOverlay = (props: Props) => {
  return (
    <div
      id="image-full-screen-overlay"
      tabIndex={-1}
      className={
        'overflow-y-auto overflow-x-hidden '+
        'fixed top-0 right-0 left-0 justify-center '+
        'flex items-center w-full h-full md:inset-0 '+
        'max-h-full transition-all duration-250 '+
        'bg-[rgba(0,0,0,0.85)] '+
        (props.visible ? 'opacity-1 z-10' : 'opacity-0 -z-10')}>

      <div className="relative m-auto p-4 w-full max-w-md max-h-full">
        <div className="relative rounded-lg shadow bg-transparent">
          <img
            src={props.imageUrl}
            className='m-auto object-contain max-h-[90%]' />

          <div className='text-center mt-3 text-xl'>
            <a
              onClick={props.onClose}
              className='cursor-pointer'>
                Close
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageFullScreenOverlay;
