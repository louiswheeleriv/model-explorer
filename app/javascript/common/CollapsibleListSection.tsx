import React, { useState, useEffect, PropsWithChildren } from "react";
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';

type Props = {
  id: string | number;
  headerText: string;
  numItems: number;
  startExpanded?: boolean;
  averageItemHeight?: number;
  transitionDuration?: number;
  className?: string;
};

const CollapsibleListSection = (props: PropsWithChildren<Props>) => {
  const startExpandedDefault = true;
  const averageItemHeightDefault = 200;
  const transitionDurationDefault = 700;

  const [isExpanded, setIsExpanded] = useState(props.startExpanded != null ? props.startExpanded : startExpandedDefault);
  const [averageItemHeight] = useState(props.averageItemHeight || averageItemHeightDefault);
  const [transitionDuration] = useState(props.transitionDuration || transitionDurationDefault);

  useEffect(() => {
    const maxHeight = isExpanded ? (averageItemHeight * props.numItems) + 'px' : 0;
    const angle = isExpanded ? 90 : 0;
    $('#'+props.id+' .collapsible').css({ 'max-height': maxHeight });
    $('#'+props.id+' .collapse-icon').css({ 'transform': 'rotate('+angle+'deg)' });
  }, [isExpanded]);

  return (
    <div id={String(props.id)} className={props.className}>
      <div className='mb-5 text-xl w-fit cursor-pointer' onClick={() => setIsExpanded(!isExpanded)}>
        <span className='mr-3'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['chevron-right']} className='collapse-icon transition-transform duration-300' />
        </span>
        {props.headerText}
      </div>
      <div className='overflow-hidden'>
        <div className={'collapsible duration-'+transitionDuration+' linear transition-[max-height]'}>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleListSection;
