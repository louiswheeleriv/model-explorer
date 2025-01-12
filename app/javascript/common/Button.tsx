import React, { PropsWithChildren, MouseEventHandler } from "react";

export type ButtonColorSet = 'default' | 'transparentDarkText' | 'transparentLightText' | 'lightgray' | 'blue' | 'green' | 'red';

type Props = {
  id?: string;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  rounded?: boolean;
  colorSet?: ButtonColorSet;
};

const Button = (props: PropsWithChildren<Props>) => {
  const rounded = props.rounded !== undefined ? props.rounded : true;
  const colorSet = props.colorSet || 'blue';

  const classesByColorSet = {
    default: 'text-white',
    transparentDarkText: 'bg-transparent text-gray-700 hover:text-gray-800',
    transparentLightText: 'bg-transparent text-white',
    lightgray: 'bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-gray-800',
    blue: 'bg-blue-500 hover:bg-blue-700 text-white',
    green: 'bg-green-400 hover:bg-green-600 text-white',
    red: 'bg-red-500 hover:bg-red-700 text-white',
  }

  let classNames = [];
  if (rounded) classNames.push('rounded');
  classNames.push(classesByColorSet[colorSet || 'default']);

  classNames.push(
    'font-bold', 'py-2', 'px-3', 'cursor-pointer',
    'transition-colors', 'disabled:cursor-not-allowed', 'disabled:opacity-50'
  );

  if (props.className) classNames.push(props.className);

  return (
    <button
      id={props.id}
      type={props.type || 'button'}
      className={classNames.join(' ')}
      onClick={props.onClick}
      disabled={props.disabled}>
        {props.children}
    </button>
  );
};

export default Button;
