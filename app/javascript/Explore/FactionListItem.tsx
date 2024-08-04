import React from "react";
import { Faction } from "../types/models";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';

type Props = {
  faction: Faction;
  numUsers: number;
  className?: string;
};

const FactionListItem = (props: Props) => {
  function redirectToGameSystemPage() {
    window.location.assign('/factions/'+props.faction.id);
  }

  return (
    <div className={props.className}>
      <div className='px-3 py-2 bg-[#607499] rounded-md flex cursor-pointer align-middle' onClick={redirectToGameSystemPage}>
        <div className='flex-1 my-auto text-l'>
          {props.faction.name}
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

export default FactionListItem;
