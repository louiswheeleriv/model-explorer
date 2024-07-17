import React from "react";
import { Faction } from "../types/models";
import StatusColorBar from "../common/StatusColorBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';

type Props = {
  faction: Faction;
  numByStatus: Record<string, number>;
  className?: string;
};

const FactionProgressBar = (props: Props) => {
  function redirectToFactionPage() {
    console.log('redirecting to '+'/my-collection/' + props.faction.name);
    window.location.assign('/my-collection/' + props.faction.name);
  }

  return (
    <div className={props.className}>
      <div className='p-4 bg-[#607499] rounded-t-md flex cursor-pointer' onClick={redirectToFactionPage}>
        <div className='flex-1'>
          {props.faction.name}
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
