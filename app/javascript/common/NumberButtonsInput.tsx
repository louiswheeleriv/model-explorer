import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Button from "./Button";
import Input from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";

type Props = {
  id?: string;
  className?: string;
  defaultValue?: number;
  onChange?: Dispatch<SetStateAction<number>>;
  disabled?: boolean;
  min?: number;
  max?: number;
};

const NumberButtonsInput = (props: Props) => {
  const [num, setNum] = useState(props.defaultValue || 0);

  useEffect(() => {
    console.log('NumberButtonsInput num changed to '+num);
    if (props.onChange) props.onChange(num);
  }, [num]);

  return (
    <>
      <div id={props.id} className={(props.className || '') + ' flex'}>
        <Button
          className='rounded-l'
          rounded={false}
          colorSet='red'
          onClick={() => setNum(num - 1)}>
            <FontAwesomeIcon icon={byPrefixAndName.fas['minus']} />
        </Button>

        <Input
          type='number'
          min={props.min}
          max={props.max}
          value={num}
          onChange={e => setNum(Number(e.target.value)) }
          className='flex-1 remove-arrow rounded-none text-xl max-w-[70px] text-center' />

        <Button
          className='rounded-r'
          rounded={false}
          colorSet='green'
          onClick={() => setNum(num + 1)}>
            <FontAwesomeIcon icon={byPrefixAndName.fas['plus']} />
        </Button>
      </div>
    </>
  );
};

export default NumberButtonsInput;
