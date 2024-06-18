import React, { PropsWithChildren, HTMLInputTypeAttribute, ChangeEventHandler } from "react";

type InputProps = {
  id?: string;
  className?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  defaultValue?: string | number | readonly string[] | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
};

const Input = (props: PropsWithChildren<InputProps>) => {
  return (
    <>
      <input
        id={props.id}
        type={props.type || 'text'}
        className={
          (props.className ? props.className+' ' : '')+
          'block border text-sm rounded-lg w-full p-2.5 '+
          'bg-gray-600 border-gray-500 placeholder-gray-400 '+
          'focus:ring-primary-500 focus:border-primary-500'
        }
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        disabled={props.disabled}>
          {props.children}
      </input>
    </>
  );
};

export default Input;
