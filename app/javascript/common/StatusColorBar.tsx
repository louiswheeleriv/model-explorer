import React, { Fragment } from "react";

const colorByStatus: Record<string, string> = {
  'unassembled': 'red-500',
  'assembled': 'orange-400',
  'in_progress': 'yellow-200',
  'finished': 'green-400',
};

const statusOrder = ['unassembled', 'assembled', 'in_progress', 'finished'];

function roundToNearest(num: number, multiple: number) {
  return Math.round(num / multiple) * multiple;
}

const StatusColorBar = ({ numByStatus, rounding, size }: { numByStatus: Record<string, number>; rounding: string; size: string; }) => {
  const totalNumModels = Object.values(numByStatus).reduce(((acc, num) => acc + num), 0);
  const statusesWithModels = statusOrder.filter((status) => numByStatus[status]);
  let statusSections = statusesWithModels.map((status, i) => {
    let numInStatus = numByStatus[status];

    let pct = (numInStatus / totalNumModels) * 100;
    let roundedPercent = roundToNearest(pct, 5);

    let borderRadiusClass = '';
    if (i === 0) {
      if (rounding === 'all') {
        borderRadiusClass = 'rounded-l-md';
      } else if (rounding === 'bottom') {
        borderRadiusClass = 'rounded-bl-md';
      }
    } else if (i === statusesWithModels.length - 1) {
      if (rounding === 'all') {
        borderRadiusClass = 'rounded-r-md';
      } else if (rounding === 'bottom') {
        borderRadiusClass = 'rounded-br-md';
      }
    }

    let height = 'h-[10px]';
    if (size === 'large') height = 'h-[60px]';
    
    return (
      <Fragment key={status}>
        <div
          className={
            'bg-'+(colorByStatus[status] || 'white') +
            ' flex-auto w-[' + roundedPercent + '%] '+
            borderRadiusClass + ' ' + height
          }></div>
      </Fragment>
    )
  });

  return (
    <>
      <div className='flex items-center w-full'>
        {statusSections}
      </div>
    </>
  );
};

export default StatusColorBar;
