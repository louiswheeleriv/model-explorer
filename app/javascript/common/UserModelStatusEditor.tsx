import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Input from "./Input";
import SummaryProgressBar from "./SummaryProgressBar";
import { QuantityByStatus } from "../types/models";
import Button from "./Button";
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
  onChange: Dispatch<SetStateAction<QuantityByStatus>>
}

const UserModelStatusEditor = (props: Props) => {
  const [quantityByStatus, setQuantityByStatus] = useState(props.quantityByStatus);
  const [valueByLabel, setValueByLabel] = useState(calculateValueByLabel(quantityByStatus));

  const [qtyUnassembled, setQtyUnassembled] = useState(quantityByStatus.unassembled);
  const [qtyAssembled, setQtyAssembled] = useState(quantityByStatus.assembled);
  const [qtyInProgress, setQtyInProgress] = useState(quantityByStatus.in_progress);
  const [qtyFinished, setQtyFinished] = useState(quantityByStatus.finished);

  useEffect(() => {
    setQuantityByStatus({
      unassembled: qtyUnassembled,
      assembled: qtyAssembled,
      in_progress: qtyInProgress,
      finished: qtyFinished
    });
  }, [qtyUnassembled, qtyAssembled, qtyInProgress, qtyFinished]);

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

        <div className='flex mt-5 items-center'>
          <div className='flex-1 text-center'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['box']} className='mr-2' />
            Unassembled
          </div>
          <NumberButtonsInput defaultValue={qtyUnassembled} onChange={setQtyUnassembled} />
        </div>
        <div className='flex mt-5 items-center'>
          <div className='flex-1 text-center'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['scalpel']} className='mr-2' />
            Assembled
          </div>
          <NumberButtonsInput defaultValue={qtyAssembled} onChange={setQtyAssembled} />
        </div>
        <div className='flex mt-5 items-center'>
          <div className='flex-1 text-center'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['paintbrush-fine']} className='mr-2' />
            In Progress
          </div>
          <NumberButtonsInput defaultValue={qtyInProgress} onChange={setQtyInProgress} />
        </div>
        <div className='flex mt-5 items-center'>
          <div className='flex-1 text-center'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['circle-check']} className='mr-2' />
            Finished
          </div>
          <NumberButtonsInput defaultValue={qtyFinished} onChange={setQtyFinished} />
        </div>
      </div>
    </>
  );
};

export default UserModelStatusEditor;
