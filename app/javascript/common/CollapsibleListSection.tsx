import React, { useState, PropsWithChildren, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import $ from 'jquery';

type Props = {
  id: string | number;
  headerText: string;
  startExpanded?: boolean;
  className?: string;
};

const CollapsibleListSection = (props: PropsWithChildren<Props>) => {
  const startExpandedDefault = true;
  const [isExpanded, setIsExpanded] = useState(props.startExpanded != null ? props.startExpanded : startExpandedDefault);

  useEffect(() => {
    const angle = isExpanded ? 90 : 0;
    $('#'+props.id+' .collapse-icon').css({ 'transform': 'rotate('+angle+'deg)' });
  }, [isExpanded]);

  return (
    <div id={String(props.id)} className={props.className}>
      <div className='mb-5 text-xl w-fit cursor-pointer' onClick={() => setIsExpanded(!isExpanded)}>
        <FontAwesomeIcon
          icon={byPrefixAndName.fas['chevron-right']}
          className='collapse-icon mr-3' />
        {props.headerText}
      </div>
      {isExpanded &&
        props.children
      }
    </div>
  );
};

export default CollapsibleListSection;
