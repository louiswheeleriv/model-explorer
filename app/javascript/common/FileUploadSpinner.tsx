import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";

type Props = {
  numItemsComplete: number;
  numItemsTotal: number;
  className?: string;
};

const FileUploadSpinner = (props: Props) => {
  return (
    <div className={'text-center '+(props.className || '')}>
      <FontAwesomeIcon icon={byPrefixAndName.fas['circle-notch']} className='my-3 fa-3x fa-spin' />
      <div>Uploading {props.numItemsComplete} / {props.numItemsTotal}</div>
    </div>
  );
};

export default FileUploadSpinner;
