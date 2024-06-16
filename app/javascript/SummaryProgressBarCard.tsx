import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';

const SummaryProgressBarCard = ({ icon, number, label }: { icon: string; number: number; label: string; }) => {
  return (
    <>
      <div className='opacity-70 bg-gray-900 text-white flex-1 ml-5 px-3 rounded-md'>
        <div className='flex'>
          <div className='flex-1 text-left'>
            <FontAwesomeIcon icon={byPrefixAndName.fas[icon]} />
          </div>
          <div className='flex-1 text-right'>
            {number}
          </div>
        </div>
        <div className='flex justify-center'>
          <div>{label}</div>
        </div>
      </div>
    </>
  );
};

export default SummaryProgressBarCard;
