import React, { PropsWithChildren, ChangeEventHandler } from "react";

type SelectProps = {
  id?: string;
  className?: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
};

const Select = (props: PropsWithChildren<SelectProps>) => {
  return (
    <>
      <select
        id={props.id}
        className={
          (props.className ? props.className+' ' : '')+
          'block border text-sm rounded-lg w-full p-2.5 '+
          'bg-gray-600 border-gray-500 placeholder-gray-400 '+
          'focus:ring-primary-500 focus:border-primary-500'+
          'disabled:text-[#aaaaaa]'
        }
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}>
          {props.children}
      </select>
    </>
  );
};

export default Select;
