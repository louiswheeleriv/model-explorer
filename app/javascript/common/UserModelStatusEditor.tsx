import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import SummaryProgressBar from "./SummaryProgressBar";
import { QuantityByStatus } from "../types/models";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import NumberButtonsInput from "./NumberButtonsInput";

function percentComplete(quantityByStatus: QuantityByStatus): number {
  const numFinished = quantityByStatus['finished']
  const numTotal = Object.values(quantityByStatus).reduce((acc, num) => acc + num, 0)
  if (numTotal < 1) return 0;
  return Math.round((numFinished / numTotal) * 100);
}

function calculateValueByLabel(quantityByStatus: QuantityByStatus) {
  return {
    'Models': Object.values(quantityByStatus).reduce((acc, num) => (acc + num), 0),
    'Complete': percentComplete(quantityByStatus) + '%'
  };
}

type Props = {
  quantityByStatus: QuantityByStatus;
  onChange: Dispatch<SetStateAction<QuantityByStatus>>;
  className?: string;
}

const UserModelStatusEditor = (props: Props) => {
  const [quantityByStatus, setQuantityByStatus] = useState<QuantityByStatus>(props.quantityByStatus);
  const [valueByLabel, setValueByLabel] = useState(calculateValueByLabel(quantityByStatus));

  useEffect(() => {
    setValueByLabel(calculateValueByLabel(quantityByStatus));
    props.onChange(quantityByStatus);
  }, [quantityByStatus]);

  useEffect(() => {
    const different = JSON.stringify(props.quantityByStatus) != JSON.stringify(quantityByStatus);
    if (different) {
      console.log('Parent quantityByStatus changed, persisting to child');
      setQuantityByStatus(props.quantityByStatus);
    }
  }, [props.quantityByStatus])

  return (
    <>
      <div className={'items-center w-full' + (props.className ? ' '+props.className : '')}>
        <div>
          <SummaryProgressBar numByStatus={quantityByStatus} valueByLabel={valueByLabel} />
        </div>

        <div className='flex mt-5 items-center'>
          <div className='flex-1 text-center'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['box']} className='mr-2' />
            Unassembled
          </div>
          <NumberButtonsInput
            stateNumber={quantityByStatus.unassembled}
            onChange={(x) => setQuantityByStatus({ ...quantityByStatus, unassembled: x })}
            className='flex-1' />
        </div>
        <div className='flex mt-5 items-center'>
          <div className='flex-1 text-center'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['screwdriver-wrench']} className='mr-2' />
            Assembled
          </div>
          <NumberButtonsInput
            stateNumber={quantityByStatus.assembled}
            onChange={(x) => setQuantityByStatus({ ...quantityByStatus, assembled: x })}
            className='flex-1' />
        </div>
        <div className='flex mt-5 items-center'>
          <div className='flex-1 text-center'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['paintbrush-fine']} className='mr-2' />
            In Progress
          </div>
          <NumberButtonsInput
            stateNumber={quantityByStatus.in_progress}
            onChange={(x) => setQuantityByStatus({ ...quantityByStatus, in_progress: x })}
            className='flex-1' />
        </div>
        <div className='flex mt-5 items-center'>
          <div className='flex-1 text-center'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['circle-check']} className='mr-2' />
            Finished
          </div>
          <NumberButtonsInput
            stateNumber={quantityByStatus.finished}
            onChange={(x) => setQuantityByStatus({ ...quantityByStatus, finished: x })}
            className='flex-1' />
        </div>
      </div>
    </>
  );
};

export default UserModelStatusEditor;
