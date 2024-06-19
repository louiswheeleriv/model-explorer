import React, { PropsWithChildren, MouseEventHandler } from "react";

type ButtonProps = {
  id?: string;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  rounded?: boolean;
};

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const rounded = props.rounded !== undefined ? props.rounded : true;
  return (
    <>
      <button
        id={props.id}
        type={props.type || 'button'}
        className={
          ((props.className || '')+' ')+
          (rounded ? 'rounded ' : ' ')+
          'bg-blue-500 hover:bg-blue-700 '+
          'text-white font-bold '+
          'py-2 px-3 cursor-pointer '+
          'disabled:cursor-not-allowed disabled:opacity-50'
        }
        onClick={props.onClick}
        disabled={props.disabled}>
          {props.children}
      </button>
    </>
  );
};

export default Button;
