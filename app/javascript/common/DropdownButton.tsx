import React from "react";
import Button, { ButtonColorSet } from "../common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";

type Props = {
  isOpen?: boolean;
  onToggle?: () => void;
  colorSet?: ButtonColorSet;
  position?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
};

const DropdownButton = (props: Props) => {
  return (
    <div className='relative inline-block'>
      <Button
        onClick={props.onToggle}
        colorSet={props.colorSet}
        className='cursor-pointer'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['ellipsis']} />
      </Button>
      {props.isOpen &&
        <div className={'absolute z-10 bg-gray-100 shadow-md rounded '+(props.position === 'left' ? 'right-0' : 'left-0')}>
          {props.children}
        </div>
      }
    </div>
  );
};

export default DropdownButton;
