import React from "react";
import { Faction, UserFaction } from "../types/models";
import StatusColorBar from "../common/StatusColorBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';

type Props = {
  faction: Faction;
  userFaction: UserFaction;
  numByStatus: Record<string, number>;
  className?: string;
};

const FactionProgressBar = (props: Props) => {
  function redirectToFactionPage() {
    window.location.assign('/my-collection/user-factions/'+props.userFaction.id);
  }

  return (
    <div className={props.className}>
      <div className='p-4 bg-[#607499] rounded-t-md flex cursor-pointer' onClick={redirectToFactionPage}>
        <div className='flex-1'>
          {props.userFaction.name ?
            props.userFaction.name+' ('+props.faction.name+')' :
            props.faction.name
          }
        </div>
        <div className='flex-1 text-right'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['chevron-right']} />
        </div>
      </div>
      <StatusColorBar numByStatus={props.numByStatus} rounding='bottom' size='small' />
    </div>
  );
};

export default FactionProgressBar;
