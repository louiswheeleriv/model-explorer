import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Input from "./Input";
import SummaryProgressBar from "./SummaryProgressBar";
import { QuantityByStatus } from "../types/models";

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
  onChange: Dispatch<SetStateAction<QuantityByStatus>>
}

const UserModelStatusEditor = (props: Props) => {
  const [quantityByStatus, setQuantityByStatus] = useState(props.quantityByStatus);
  const [valueByLabel, setValueByLabel] = useState(calculateValueByLabel(quantityByStatus));

  useEffect(() => {
    setValueByLabel(calculateValueByLabel(quantityByStatus));
    props.onChange(quantityByStatus);
  }, [quantityByStatus]);

  return (
    <>
      <div className='items-center w-full'>
        <div>
          <SummaryProgressBar numByStatus={quantityByStatus} valueByLabel={valueByLabel} />
        </div>

        <div>
          <label htmlFor='quantity-unassembled' className='inline text-sm'>Unassembled</label>
          <Input
            id='quantity-unassembled'
            type='number'
            min={0}
            defaultValue={quantityByStatus.unassembled}
            onChange={e => setQuantityByStatus({ ...quantityByStatus, unassembled: Number(e.target.value) })}
            className='inline' />
        </div>
        <div>
          <label htmlFor='quantity-assembled' className='inline text-sm'>Assembled</label>
          <Input
            id='quantity-assembled'
            type='number'
            min={0}
            defaultValue={quantityByStatus.assembled}
            onChange={e => setQuantityByStatus({ ...quantityByStatus, assembled: Number(e.target.value) })}
            className='inline' />
        </div>
        <div>
          <label htmlFor='quantity-in-progress' className='inline text-sm'>In Progress</label>
          <Input
            id='quantity-in-progress'
            type='number'
            min={0}
            defaultValue={quantityByStatus.in_progress}
            onChange={e => setQuantityByStatus({ ...quantityByStatus, in_progress: Number(e.target.value) })}
            className='inline' />
        </div>
        <div>
          <label htmlFor='quantity-finished' className='inline text-sm'>Finished</label>
          <Input
            id='quantity-finished'
            type='number'
            min={0}
            defaultValue={quantityByStatus.finished}
            onChange={e => setQuantityByStatus({ ...quantityByStatus, finished: Number(e.target.value) })}
            className='inline' />
        </div>
      </div>
    </>
  );
};

export default UserModelStatusEditor;
