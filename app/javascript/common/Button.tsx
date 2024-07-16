import React, { PropsWithChildren, MouseEventHandler } from "react";

type Props = {
  id?: string;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  rounded?: boolean;
  colorSet?: 'none' | 'blue' | 'green' | 'red';
};

const Button = (props: PropsWithChildren<Props>) => {
  const rounded = props.rounded !== undefined ? props.rounded : true;
  const colorSet = props.colorSet || 'blue';

  let classNames = [];
  if (rounded) classNames.push('rounded');
  if (colorSet === 'blue') classNames.push('bg-blue-500', 'hover:bg-blue-700');
  if (colorSet === 'green') classNames.push('bg-green-400', 'hover:bg-green-600');
  if (colorSet === 'red') classNames.push('bg-red-500', 'hover:bg-red-700');

  classNames.push(
    'text-white', 'font-bold', 'py-2', 'px-3', 'cursor-pointer',
    'transition-colors', 'disabled:cursor-not-allowed', 'disabled:opacity-50'
  );

  if (props.className) classNames.push(props.className);

  return (
    <>
      <button
        id={props.id}
        type={props.type || 'button'}
        className={classNames.join(' ')}
        onClick={props.onClick}
        disabled={props.disabled}>
          {props.children}
      </button>
    </>
  );
};

export default Button;
