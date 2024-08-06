import React, { PropsWithChildren, HTMLInputTypeAttribute, ChangeEventHandler } from "react";

type Props = {
  id?: string;
  className?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  defaultValue?: string | number | readonly string[] | undefined;
  value?: string | number | readonly string[] | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  min?: string | number | undefined;
  max?: string | number | undefined;
};

const Input = (props: PropsWithChildren<Props>) => {
  return (
    <input
      id={props.id}
      type={props.type || 'text'}
      className={
        (props.className ? props.className+' ' : '')+
        'block border text-[16px] rounded-lg w-full p-2.5 '+
        'bg-gray-600 border-gray-500 placeholder-gray-400 '+
        'disabled:text-[#aaaaaa] '+
        'focus:ring-primary-500 focus:border-primary-500'
      }
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
      value={props.value}
      onChange={props.onChange}
      disabled={props.disabled}
      min={props.min}
      max={props.max}>
        {props.children}
    </input>
  );
};

export default Input;
