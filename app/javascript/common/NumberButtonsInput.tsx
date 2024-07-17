import React, { useState, useEffect } from "react";
import Button from "./Button";
import Input from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";

type Props = {
  stateNumber: number;
  onChange: (x: number) => void;
  id?: string;
  className?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
};

const NumberButtonsInput = (props: Props) => {
  const [stateNumber, setStateNumber] = useState(props.stateNumber);

  useEffect(() => {
    if (props.stateNumber !== stateNumber) setStateNumber(props.stateNumber);
  }, [props.stateNumber]);

  useEffect(() => {
    props.onChange(stateNumber);
  }, [stateNumber]);

  return (
    <div id={props.id} className={(props.className || '') + ' flex'}>
      <Button
        className='rounded-l touch-manipulation'
        rounded={false}
        colorSet='red'
        disabled={stateNumber <= 0}
        onClick={() => setStateNumber(stateNumber - 1)}>
          <FontAwesomeIcon icon={byPrefixAndName.fas['minus']} />
      </Button>

      <Input
        type='number'
        min={props.min}
        max={props.max}
        value={stateNumber}
        onChange={e => setStateNumber(Number(e.target.value)) }
        className='flex-1 remove-arrow rounded-none text-xl max-w-[70px] text-center' />

      <Button
        className='rounded-r touch-manipulation'
        rounded={false}
        colorSet='green'
        onClick={() => setStateNumber(stateNumber + 1)}>
          <FontAwesomeIcon icon={byPrefixAndName.fas['plus']} />
      </Button>
    </div>
  );
};

export default NumberButtonsInput;
