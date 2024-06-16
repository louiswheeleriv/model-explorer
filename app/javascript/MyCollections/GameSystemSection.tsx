import React, { Fragment } from "react";
import { GameSystem, Faction } from "../types/models";
import FactionProgressBar from "./FactionProgressBar";
import $ from 'jquery';

const GameSystemSection = ({ gameSystem, factionSections, className }: {
  gameSystem: GameSystem;
  factionSections: {
    faction: Faction;
    factionNumByStatus: Record<string, number>
  }[];
  className?: string;
}) => {
  function toggleGameSystemSection() {
    $('#'+componentId+' .faction-sections').toggle();
    $('#'+componentId+' .collapse-icon').toggleClass(['fa-chevron-down', 'fa-chevron-right']);
  }

  const componentId = 'game-system-section-' + gameSystem.id;

  return (
    <Fragment key={gameSystem.id}>
      <div className={className} id={componentId}>
        <div className='mb-5 text-xl' onClick={toggleGameSystemSection}>
          <i className='collapse-icon fa-solid fa-chevron-down mr-3'></i>
          {gameSystem.name}
        </div>
        <div className='faction-sections'>
          {factionSections.map((factionSection) => (
            <FactionProgressBar
              faction={factionSection.faction}
              numByStatus={factionSection.factionNumByStatus}
              className='mb-5'/>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default GameSystemSection;
