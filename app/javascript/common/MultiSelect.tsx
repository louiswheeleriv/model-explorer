import React, { PropsWithChildren, ChangeEventHandler } from "react";

type Props = {
  options: MultiSelectOption[];
  id?: string;
  className?: string;
  onOptionSelected?: (option: MultiSelectOption) => void;
  onOptionDeselected?: (option: MultiSelectOption) => void;
};

export type MultiSelectOption = {
  value: string | number;
  label: string;
  disabled?: boolean;
  selected?: boolean;
}

const MultiSelect = (props: Props) => {
  function handleOptionChanged(option: MultiSelectOption, e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked && props.onOptionSelected) {
      if (props.onOptionSelected) props.onOptionSelected(option);
    } else {
      if (props.onOptionDeselected) props.onOptionDeselected(option);
    }
  }

  return (
    <ul id={props.id} className={props.className}>
      {props.options.map((opt) => (
        <li key={opt.value} className='p-1'>
          <input
            id={'multi-select-option-'+opt.value}
            type='checkbox'
            checked={opt.selected}
            disabled={opt.disabled}
            onChange={(e) => {handleOptionChanged(opt, e)}}
            className='w-4 h-4 mr-2 text-blue-600 rounded bg-gray-600 border-gray-500' />
          <label htmlFor={'multi-select-option-'+opt.value}>
            {opt.label}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default MultiSelect;
