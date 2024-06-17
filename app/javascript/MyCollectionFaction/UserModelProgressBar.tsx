import React, { useState, useEffect} from "react";
import { Model, UserModel } from "../types/models";
import StatusColorBar from "../common/StatusColorBar";
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import { countByStatus } from "../utils/helpers";

const UserModelProgressBar = ({ model, userModels, startExpanded = true, className }: {
  model: Model;
  userModels: UserModel[];
  startExpanded?: boolean;
  className?: string;
}) => {
  const numByStatus = countByStatus(userModels);

  const [isExpanded, setIsExpanded] = useState(startExpanded);

  useEffect(() => {
    // const marginTop = isExpanded ? '0' : '-100%';
    // const angle = isExpanded ? 0 : -90;
    // $('#'+componentId+' .faction-sections').css({ 'margin-top': marginTop });
    // $('#'+componentId+' .collapse-icon').css({ 'transform': 'rotate('+angle+'deg)' })
  }, [isExpanded]);

  const componentId = 'model-' + model.id;

  return (
    <div className={className} id={componentId}>
      <div className='p-4 bg-[#607499] rounded-t-md flex cursor-pointer items-center' onClick={() => setIsExpanded(!isExpanded)}>
        <FontAwesomeIcon icon={byPrefixAndName.fas['chevron-right']}  className='collapse-icon transition-transform duration-300 mr-3' />
        {model.name}
      </div>
      <StatusColorBar numByStatus={numByStatus} rounding='bottom' size='small' />
    </div>
  );
};

export default UserModelProgressBar;
