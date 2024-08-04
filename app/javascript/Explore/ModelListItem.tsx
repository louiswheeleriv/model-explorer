import React from "react";
import { Model } from "../types/models";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';

type Props = {
  model: Model;
  numUsers: number;
  className?: string;
};

const ModelListItem = (props: Props) => {
  function redirectToModelPage() {
    window.location.assign('/models/'+props.model.id);
  }

  return (
    <div className={props.className}>
      <div className='px-3 py-2 bg-[#607499] rounded-md flex cursor-pointer align-middle' onClick={redirectToModelPage}>
        <div className='flex-1 my-auto text-l'>
          {props.model.name}
          <div className='ml-5'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['user']} className='mr-2' />
            Users: {props.numUsers || 0}
          </div>
        </div>
        <div className='flex-1 my-auto text-right'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['chevron-right']} />
        </div>
      </div>
    </div>
  );
};

export default ModelListItem;
