import React, { Fragment } from "react";
import { GameSystem, Faction, Model, UserModel } from "../types/models";
import SummaryProgressBar from "../common/SummaryProgressBar";
import GameSystemSection from "./GameSystemSection";
import { countByStatus } from "../utils/helpers";

const MyCollection = ({ user_models, models, factions, game_systems }: { user_models: UserModel[]; models: Model[]; factions: Faction[]; game_systems: GameSystem[]; }) => {
  const numByStatus = countByStatus(user_models);

  const valueByLabel = {
    'Factions': factions.length,
    'Models': user_models.reduce((acc, um) => (acc + um.quantity), 0),
    'Complete': Math.round((numByStatus['finished'] / Object.values(numByStatus).reduce((acc, num) => acc + num) * 100)) + '%'
  }

  let factionIdByModelId: Record<number, number> = {};
  models.forEach((model) => {
    factionIdByModelId[model.id] = model.faction_id;
  });

  const gameSystemSections = game_systems.map((gameSystem) => {
    const factionSections =
      factions
        .filter((faction) => faction.game_system_id === gameSystem.id)
        .map((faction) => {
          const factionUserModels = user_models.filter((um) => {
            return factionIdByModelId[um.model_id] === faction.id;
          });
          return {
            faction: faction,
            factionNumByStatus: countByStatus(factionUserModels),
          };
        });
    return {
      gameSystem: gameSystem,
      factionSections: factionSections,
    };
  });

  return (
    <>
      <div className='px-6 py-8 max-w-[600px] mx-auto'>
        <h2 className='text-2xl text-center mb-5'>My Collection</h2>

        <SummaryProgressBar
          numByStatus={numByStatus}
          valueByLabel={valueByLabel}
        />

        {gameSystemSections.map((gameSystemSection) => (
          <Fragment key={gameSystemSection.gameSystem.id}>
            <GameSystemSection
              gameSystem={gameSystemSection.gameSystem}
              factionSections={gameSystemSection.factionSections}
              startExpanded={true}
              className='mt-5'/>
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default MyCollection;
