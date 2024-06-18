import React, { Fragment } from "react";
import { UserModelStatus } from "../types/models";

const colorByStatus: Record<UserModelStatus, string> = {
  unassembled: 'red-500',
  assembled: 'orange-400',
  in_progress: 'yellow-200',
  finished: 'green-400',
};

const statusOrder: UserModelStatus[] = ['unassembled', 'assembled', 'in_progress', 'finished'];

function roundToNearest(num: number, multiple: number) {
  return Math.round(num / multiple) * multiple;
}

type Props = {
  numByStatus: Record<UserModelStatus, number>;
  rounding: 'all' | 'bottom';
  size: 'large' | 'small';
}

const StatusColorBar = (props: Props) => {
  let numByStatus = props.numByStatus;
  let numByStatusZeroCase = { unassembled: 1, assembled: 0, in_progress: 0, finished: 0 };
  let totalNumModels = Object.values(numByStatus).reduce(((acc, num) => acc + num), 0);

  if (totalNumModels < 1) {
    numByStatus = numByStatusZeroCase;
    totalNumModels = 1;
  }
  
  const statusesWithModels = statusOrder.filter((status) => numByStatus[status]);
  let statusSections = statusesWithModels.map((status, i) => {
    let numInStatus = numByStatus[status];

    let pct = (numInStatus / totalNumModels) * 100;
    let roundedPercent = roundToNearest(pct, 5);

    let borderRadiusClass = '';
    if (i === 0) {
      if (props.rounding === 'all') {
        borderRadiusClass = 'rounded-l-md';
      } else if (props.rounding === 'bottom') {
        borderRadiusClass = 'rounded-bl-md';
      }
    } else if (i === statusesWithModels.length - 1) {
      if (props.rounding === 'all') {
        borderRadiusClass = 'rounded-r-md';
      } else if (props.rounding === 'bottom') {
        borderRadiusClass = 'rounded-br-md';
      }
    }

    let height = 'h-[10px]';
    if (props.size === 'large') height = 'h-[60px]';
    
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
