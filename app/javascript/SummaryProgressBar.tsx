import React, { Fragment } from "react";
import StatusColorBar from "./StatusColorBar";
import SummaryProgressBarCard from "./SummaryProgressBarCard";

const iconByLabel: Record<string, string> = {
  'Factions': 'F',
  'Models': 'M'
};

const SummaryProgressBar = ({ numByStatus, numByLabel }: { numByStatus: Record<string, number>; numByLabel: Record<string, number>; }) => {
  let cards = Object.entries(numByLabel).map(([label, num]) => {
    return (
      <Fragment key={label}>
        <SummaryProgressBarCard icon={iconByLabel[label] || 'X'} number={num} label={label} />
      </Fragment>
    )
  });

  return (
    <>
      <div className='flex items-center'>
        <StatusColorBar numByStatus={numByStatus} size='large' rounding='all' />
        <div className='flex absolute'>
          {cards}
        </div>
      </div>
    </>
  );
};

export default SummaryProgressBar;
