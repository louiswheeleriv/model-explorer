import React, { Fragment } from "react";
import { GameSystem, Faction } from "../types/models";
import StatusColorBar from "../StatusColorBar";

const FactionProgressBar = ({ faction, numByStatus, className }: {
  faction: Faction;
  numByStatus: Record<string, number>;
  className?: string;
}) => {
  return (
    <Fragment key={faction.id}>
      <div className={className}>
        <div className='p-4 bg-[#607499] rounded-t-md flex'>
          <div className='flex-1'>
            {faction.name}
          </div>
          <div className='flex-1 text-right'>
            <i className='fa-solid fa-chevron-right'></i>
          </div>
        </div>
        <StatusColorBar numByStatus={numByStatus} rounding='bottom' size='small' />
      </div>
    </Fragment>
  );
};

export default FactionProgressBar;
