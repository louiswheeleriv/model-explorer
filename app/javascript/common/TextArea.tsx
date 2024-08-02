import React, { ChangeEventHandler } from "react";

type Props = {
  id?: string;
  className?: string;
  placeholder?: string;
  defaultValue?: string | readonly string[] | undefined;
  value?: string | number | readonly string[] | undefined;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  disabled?: boolean;
};

const TextArea = (props: Props) => {
  return (
    <>
      <textarea
        id={props.id}
        className={
          (props.className ? props.className+' ' : '')+
          'block border text-sm rounded-lg w-full p-2.5 '+
          'bg-gray-600 border-gray-500 placeholder-gray-400 '+
          'disabled:text-[#aaaaaa] resize-y '+
          'focus:ring-primary-500 focus:border-primary-500'
        }
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled} />
    </>
  );
};

export default TextArea;
