import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

type Props = {
  tabs: Tab[];
  initialTab: string;
  onTabClicked: (tabValue: string) => void;
  className?: string;
};

export type Tab = {
  value: string;
  label: string;
  icon: string;
  iconBadgeNumber?: number;
}

const TabsBar = (props: Props) => {  
  const [selectedTab, setSelectedTab] = useState(props.initialTab);

  useEffect(() => {
    props.onTabClicked(selectedTab);
  }, [selectedTab]);

  return (
    <div className={'flex '+props.className}>
      {props.tabs.map((tab) => (
        <div key={tab.value} onClick={() => setSelectedTab(tab.value)}
          className={'flex-1 cursor-pointer text-center p-3'+(selectedTab === tab.value ? ' border-b text-lg font-semibold' : '')}>

            <span className='fa-layers fa-fw'>
              <FontAwesomeIcon icon={byPrefixAndName.fas[tab.icon]} size='xl' />
              {tab.iconBadgeNumber != null && Number(tab.iconBadgeNumber) > 0 &&
                <span className='fa-layers-counter -top-[9px] -right-[11px] h-[70px] text-[3em] font-bold'>
                  {tab.iconBadgeNumber}
                </span>
              }
            </span>
            <span className='hidden sm:inline sm:ml-3'>{tab.label}</span>
        </div>  
      ))}
    </div>
  );
};

export default TabsBar;
