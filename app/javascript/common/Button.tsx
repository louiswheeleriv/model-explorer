import React, { PropsWithChildren, MouseEventHandler } from "react";

type ButtonProps = {
  id?: string;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const Button = (props: PropsWithChildren<ButtonProps>) => {
  return (
    <>
      <button
        id={props.id}
        type={props.type || 'button'}
        className={
          (props.className ? props.className+' ' : '')+
          'bg-blue-500 hover:bg-blue-700 '+
          'text-white font-bold '+
          'py-2 px-3 rounded cursor-pointer '+
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
