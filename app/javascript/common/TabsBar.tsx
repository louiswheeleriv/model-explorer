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
            <FontAwesomeIcon icon={byPrefixAndName.fas[tab.icon]} size='lg' />
            <span className='hidden sm:inline sm:ml-2'>{tab.label}</span>
        </div>  
      ))}
    </div>
  );
};

export default TabsBar;
