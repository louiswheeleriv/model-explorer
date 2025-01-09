import React from "react";
import { Faction, UserFaction } from "../types/models";
import StatusColorBar from "../common/StatusColorBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';

type Props = {
  faction: Faction;
  userFaction: UserFaction;
  numByStatus: Record<string, number>;
  numImages: number;
  className?: string;
};

const FactionProgressBar = (props: Props) => {
  const totalQuantity = Object.values(props.numByStatus).reduce((acc, num) => acc + num, 0);

  function redirectToFactionPage() {
    window.location.assign('/user-factions/'+props.userFaction.id);
  }

  return (
    <div className={props.className}>
      <div className='p-4 bg-[#607499] rounded-t-md flex cursor-pointer' onClick={redirectToFactionPage}>
        <div className='flex-1'>
          <div>
            {props.userFaction.name ?
              props.userFaction.name+' ('+props.faction.name+')' :
              props.faction.name
            }
          </div>
          <div className='pl-3 flex'>
            <div className='flex-none'>
              <FontAwesomeIcon icon={byPrefixAndName.fas['chess-knight']} className='mr-2' />
              {totalQuantity}
            </div>
            {props.numImages > 0 &&
              <div className='flex-none ml-3'>
                <FontAwesomeIcon icon={byPrefixAndName.fas['camera']} className='mr-2' />
                {props.numImages}
              </div>
            }
          </div>
        </div>
        <div className='flex-none text-right content-center'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['chevron-right']} />
        </div>
      </div>
      <StatusColorBar numByStatus={props.numByStatus} rounding='bottom' size='small' />
    </div>
  );
};

export default FactionProgressBar;
