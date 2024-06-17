import React from "react";
import { Faction } from "../types/models";
import StatusColorBar from "../common/StatusColorBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';

const FactionProgressBar = ({ faction, numByStatus, className }: {
  faction: Faction;
  numByStatus: Record<string, number>;
  className?: string;
}) => {
  function redirectToFactionPage() {
    window.location.assign('/my_collection/' + faction.name);
  }

  return (
    <div className={className}>
      <div className='p-4 bg-[#607499] rounded-t-md flex cursor-pointer' onClick={redirectToFactionPage}>
        <div className='flex-1'>
          {faction.name}
        </div>
        <div className='flex-1 text-right'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['chevron-right']} />
        </div>
      </div>
      <StatusColorBar numByStatus={numByStatus} rounding='bottom' size='small' />
    </div>
  );
};

export default FactionProgressBar;
