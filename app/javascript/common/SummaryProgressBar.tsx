import React, { Fragment } from "react";
import StatusColorBar from "./StatusColorBar";
import SummaryProgressBarCard from "./SummaryProgressBarCard";

const iconByLabel: Record<string, string> = {
  'Factions': 'flag',
  'Models': 'chess-knight',
  'Complete': 'check'
};

const SummaryProgressBar = ({ numByStatus, valueByLabel }: { numByStatus: Record<string, number>; valueByLabel: Record<string, string | number>; }) => {
  let cards = Object.entries(valueByLabel).map(([label, value]) => {
    return (
      <Fragment key={label}>
        <SummaryProgressBarCard icon={iconByLabel[label]} value={value} label={label} />
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
