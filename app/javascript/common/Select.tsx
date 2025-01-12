import React, { PropsWithChildren, ChangeEventHandler } from "react";

type Props = {
  id?: string;
  className?: string;
  value?: string | number | readonly string[] | undefined;
  defaultValue?: string | number | readonly string[] | undefined;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
};

const Select = (props: PropsWithChildren<Props>) => {
  return (
    <>
      <select
        id={props.id}
        className={
          'block border text-[16px] rounded-lg w-full p-2.5 '+
          'bg-gray-600 border-gray-500 placeholder-gray-400 '+
          'focus:ring-primary-500 focus:border-primary-500'+
          'disabled:text-[#aaaaaa] '+(props.className || '')
        }
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        disabled={props.disabled}>
          {props.children}
      </select>
    </>
  );
};

export default Select;
