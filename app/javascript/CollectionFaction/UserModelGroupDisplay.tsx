import React, { Fragment, useEffect, useState} from "react";
import { Faction, Model, UserFaction, UserModel, UserModelGroup } from "../types/models";
import UserModelProgressBar from "./UserModelProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";
import $ from 'jquery';
import CollapsibleListSection from "../common/CollapsibleListSection";

type Props = {
  faction: Faction;
  userFaction: UserFaction;
  userModelGroup?: UserModelGroup;
  userModels: UserModel[];
  factionModelById: Record<number, Model>;
  startExpanded?: boolean;
  className?: string;
}

const UserModelGroupDisplay = (props: Props) => {
  const [isExpanded, setIsExpanded] = useState(props.startExpanded != undefined ? props.startExpanded : true);

  const componentId = 'user-model-group-' + props.userModelGroup?.id;

  function toggleGroup() {
    setIsExpanded(!isExpanded);
  }

  useEffect(() => {
    const itemHeight = 200;
    const maxHeight = isExpanded ? (itemHeight * props.userModels.length) + 'px' : 0;
    const angle = isExpanded ? 90 : 0;
    $('#'+componentId+' .models').css({
      'max-height': maxHeight
    });
    $('#'+componentId+' .group-collapse-icon').css({ 'transform': 'rotate('+angle+'deg)' });
  }, [isExpanded]);

  return (
    <CollapsibleListSection
      id={props.userModelGroup?.id || 'ungrouped'}
      headerText={props.userModelGroup ? props.userModelGroup.name : 'Ungrouped'}
      numItems={props.userModels.length}>
    
      {props.userModels.length === 0 &&
        <div className='text-xl text-center my-5'>
          No Models
        </div>
      }

      {props.userModels
        .sort((a, b) => {
          const aName = a.name || props.factionModelById[a.model_id].name;
          const bName = b.name || props.factionModelById[b.model_id].name;
          if (aName < bName) return -1;
          if (aName > bName) return 1;
          return 0;
        })
        .map((userModel: UserModel) => (
          <UserModelProgressBar
            key={userModel.id}
            faction={props.faction}
            userFaction={props.userFaction}
            model={props.factionModelById[userModel.model_id]}
            userModel={userModel}
            className={'mb-5'} />
        ))}
    </CollapsibleListSection>

    // <div className={props.className} id={componentId}>
    //   <div className='group-name my-5 text-xl cursor-pointer' onClick={toggleGroup}>
    //     <FontAwesomeIcon
    //       icon={byPrefixAndName.fas['chevron-right']}
    //       className='group-collapse-icon transition-transform duration-300 mr-3' />
    //     {props.userModelGroup ? props.userModelGroup.name : 'Ungrouped'}
    //   </div>
    //   <div className='overflow-hidden'>
    //     <div className='models transition-[max-height] ease-in-out duration-500'>
    //       {props.userModels.length === 0 &&
    //         <div className='text-xl text-center my-5'>
    //           No Models
    //         </div>
    //       }

    //       {props.userModels
    //         .sort((a, b) => {
    //           const aName = a.name || props.factionModelById[a.model_id].name;
    //           const bName = b.name || props.factionModelById[b.model_id].name;
    //           if (aName < bName) return -1;
    //           if (aName > bName) return 1;
    //           return 0;
    //         })
    //         .map((userModel: UserModel) => (
    //           <Fragment key={userModel.id}>
    //             <UserModelProgressBar
    //               faction={props.faction}
    //               userFaction={props.userFaction}
    //               model={props.factionModelById[userModel.model_id]}
    //               userModel={userModel}
    //               className={'mb-5'} />
    //           </Fragment>
    //         ))}
    //     </div>
    //   </div>
    // </div>
  );
};

export default UserModelGroupDisplay;
