import React from "react";

type Props = {
  onClick?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  className?: string;
  children: React.ReactNode;
};

const DropdownButtonItem = (props: Props) => {
  let className = 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900 cursor-pointer';
  if (props.isFirst) className += ' rounded-t-md';
  if (props.isLast) className += ' rounded-b-md';
  if (props.className) className += ' '+props.className;

  return (
    <a
      onClick={props.onClick}
      className={className}>
        <div className='flex items-center text-left'>
          {props.children}
        </div>
    </a>
  );
};

export default DropdownButtonItem;
