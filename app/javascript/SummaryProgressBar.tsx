import React from "react";
import SummaryProgressBarCard from "./SummaryProgressBarCard";

const colorByStatus: Record<string, string> = {
  'unassembled': 'red-500',
  'assembled': 'orange-400',
  'in_progress': 'yellow-200',
  'finished': 'green-400',
};

const iconByLabel: Record<string, string> = {
  'Collections': 'C',
  'Models': 'M'
};

const statusOrder = ['unassembled', 'assembled', 'in_progress', 'finished'];

function roundToNearest(num: number, multiple: number) {
  return Math.round(num / multiple) * multiple;
}

const SummaryProgressBar = ({ numByStatus, numByLabel }: { numByStatus: Record<string, number>; numByLabel: Record<string, number>; }) => {
  const totalNumModels = Object.values(numByStatus).reduce(((acc, num) => acc + num), 0);
  const statusesWithModels = statusOrder.filter((status) => numByStatus[status]);
  let statusSections = statusesWithModels.map((status, i) => {
    let numInStatus = numByStatus[status];

    let pct = (numInStatus / totalNumModels) * 100;
    let roundedPercent = roundToNearest(pct, 5);

    let borderRadiusClass = '';
    if (i === 0) {
      borderRadiusClass = 'rounded-l-md';
    } else if (i === statusesWithModels.length - 1) {
      borderRadiusClass = 'rounded-r-md';
    }
    
    return (
      <>
        <div
          key={status}
          className={
            'bg-'+(colorByStatus[status] || 'white')+
            ' flex-auto w-[' + roundedPercent + '%] h-[60px] '+
            borderRadiusClass
          }></div>
      </>
    )
  });

  let cards = Object.entries(numByLabel).map(([label, num]) => {
    return (
      <>
        <SummaryProgressBarCard key={label} icon={iconByLabel[label] || 'X'} number={num} label={label} />
      </>
    )
  });

  return (
    <>
      <div className='flex items-center'>
        {statusSections}
        <div className='flex absolute'>
          {cards}
        </div>
      </div>
    </>
  );
};

export default SummaryProgressBar;
