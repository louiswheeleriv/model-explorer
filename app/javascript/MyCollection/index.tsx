import React, { Fragment } from "react";
import { GameSystem, Faction, Model, UserModel } from "../types/models";
import SummaryProgressBar from "../SummaryProgressBar";
import GameSystemSection from "./GameSystemSection";

const MyCollection = ({ user_models, models, factions, game_systems }: { user_models: UserModel[]; models: Model[]; factions: Faction[]; game_systems: GameSystem[]; }) => {
  function countByStatus(userModels: UserModel[]): Record<string, number> {
    return userModels.reduce((acc: Record<string, number>, um) => {
      let status = um.status;
      let qty = um.quantity;
      if (!acc[status]) acc[status] = 0;
      acc[status] += qty;
      return acc;
    }, {});
  }

  const numByStatus = countByStatus(user_models);

  const numByLabel = {
    'Factions': factions.length,
    'Models': user_models.reduce((acc, um) => (acc + um.quantity), 0)
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
        <SummaryProgressBar
          numByStatus={numByStatus}
          numByLabel={numByLabel}
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
