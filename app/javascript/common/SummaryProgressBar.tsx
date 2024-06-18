import React, { Fragment } from "react";
import StatusColorBar from "./StatusColorBar";
import SummaryProgressBarCard from "./SummaryProgressBarCard";

const iconByLabel: Record<string, string> = {
  'Factions': 'flag',
  'Models': 'chess-knight',
  'Complete': 'check'
};

type Props = {
  numByStatus: Record<string, number>;
  valueByLabel: Record<string, string | number>;
};

const SummaryProgressBar = (props: Props) => {
  let cards = Object.entries(props.valueByLabel).map(([label, value]) => {
    return (
      <Fragment key={label}>
        <SummaryProgressBarCard icon={iconByLabel[label]} value={value} label={label} />
      </Fragment>
    )
  });

  return (
    <>
      <div className='flex items-center'>
        <StatusColorBar numByStatus={props.numByStatus} size='large' rounding='all' />
        <div className='flex absolute'>
          {cards}
        </div>
      </div>
    </>
  );
};

export default SummaryProgressBar;
