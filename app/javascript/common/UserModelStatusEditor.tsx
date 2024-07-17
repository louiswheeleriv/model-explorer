import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { QuantityByStatus } from "../types/models";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import NumberButtonsInput from "./NumberButtonsInput";

type Props = {
  quantityByStatus: QuantityByStatus;
  onChange: Dispatch<SetStateAction<QuantityByStatus>>;
  className?: string;
}

const UserModelStatusEditor = (props: Props) => {
  const [quantityByStatus, setQuantityByStatus] = useState<QuantityByStatus>(props.quantityByStatus);

  useEffect(() => {
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
    <div className={'items-center w-full' + (props.className ? ' '+props.className : '')}>
      <div className='flex mt-5 items-center'>
        <div className='flex-1 text-center'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['box']} className='mr-2' />
          Unassembled
        </div>
        <NumberButtonsInput
          stateNumber={quantityByStatus.unassembled}
          min={0}
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
          min={0}
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
          min={0}
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
          min={0}
          onChange={(x) => setQuantityByStatus({ ...quantityByStatus, finished: x })}
          className='flex-1' />
      </div>
    </div>
  );
};

export default UserModelStatusEditor;
