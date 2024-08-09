import React from "react";
import { GameSystem, Faction, UserFaction } from "../types/models";
import FactionProgressBar from "./FactionProgressBar";
import CollapsibleListSection from "../common/CollapsibleListSection";

type Props = {
  gameSystem: GameSystem;
  userFactionSections: {
    faction: Faction;
    userFaction: UserFaction;
    factionNumByStatus: Record<string, number>;
    numImages: number;
  }[];
  startExpanded: boolean;
  className?: string;
};

const GameSystemSection = (props: Props) => {
  return (
    <CollapsibleListSection
      id={'game-system-section-' + props.gameSystem.id}
      headerText={props.gameSystem.name}
      className='mt-5'>

      {props.userFactionSections.map((userFactionSection) => (
        <FactionProgressBar
          key={userFactionSection.userFaction.id}
          faction={userFactionSection.faction}
          userFaction={userFactionSection.userFaction}
          numByStatus={userFactionSection.factionNumByStatus}
          numImages={userFactionSection.numImages}
          className='mb-5'/>
      ))}
    </CollapsibleListSection>
  );
};

export default GameSystemSection;
