import React from "react";
import { UserFaction, GameSystem, Faction, Model, UserModel } from "../types/models";
import { countByStatus } from "../utils/helpers";

import SummaryProgressBar from "../common/SummaryProgressBar";
import GameSystemSection from "../Collection/GameSystemSection";

type Props = {
  userFactions: UserFaction[];
  userModels: UserModel[];
  models: Model[];
  factions: Faction[];
  gameSystems: GameSystem[];
  numImagesByUserFactionId: Record<number, number>;
};

const UserCollection = (props: Props) => {
  const numByStatus = countByStatus(props.userModels);
  let factionById: Record<number, Faction> = {};
  props.factions.forEach((faction) => factionById[faction.id] = faction)

  const valueByLabel = {
    'Factions': props.userFactions.length,
    'Models': props.userModels.reduce((acc, um) => (
      acc + um.qty_unassembled + um.qty_assembled + um.qty_in_progress + um.qty_finished
    ), 0),
    'Complete': Math.round((numByStatus['finished'] / Object.values(numByStatus).reduce((acc, num) => acc + num) * 100)) + '%'
  }

  let factionIdByModelId: Record<number, number> = {};
  props.models.forEach((model) => {
    factionIdByModelId[model.id] = model.faction_id;
  });

  const gameSystemSections = props.gameSystems.map((gameSystem) => {
    const userFactionSections =
      props.userFactions
        .map((userFaction) => {
          return {
            faction: factionById[userFaction.faction_id],
            userFaction: userFaction
          }
        })
        .filter((userFactionData) => userFactionData.faction.game_system_id === gameSystem.id)
        .sort((a, b) => {
          if (a.faction.name < b.faction.name) return -1;
          if (a.faction.name > b.faction.name) return 1;
          if (a.userFaction.name < b.userFaction.name) return -1;
          if (a.userFaction.name > b.userFaction.name) return 1;
          return 0;
        })
        .map((userFactionData) => {
          const userFactionUserModels = props.userModels.filter((um) => {
            return um.user_faction_id === userFactionData.userFaction.id;
          });
          return {
            faction: userFactionData.faction,
            userFaction: userFactionData.userFaction,
            factionNumByStatus: countByStatus(userFactionUserModels),
            numImages: props.numImagesByUserFactionId[userFactionData.userFaction.id] || 0,
          };
        });
    return {
      gameSystem: gameSystem,
      userFactionSections: userFactionSections,
    };
  });

  return (
    <div id='user-collection'>
      <SummaryProgressBar
        numByStatus={numByStatus}
        valueByLabel={valueByLabel}
      />

      {gameSystemSections.map((gameSystemSection) => (
        <GameSystemSection
          key={gameSystemSection.gameSystem.id}
          gameSystem={gameSystemSection.gameSystem}
          userFactionSections={gameSystemSection.userFactionSections}
          startExpanded={true}
          className='mt-5'/>
      ))}
    </div>
  );
};

export default UserCollection;
