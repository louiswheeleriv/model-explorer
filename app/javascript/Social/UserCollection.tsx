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
  const totalNumModels = Object.values(numByStatus).reduce((acc, num) => acc + num);
  
  const valueByLabel = {
    'Factions': props.userFactions.length,
    'Models': props.userModels.reduce((acc, um) => (
      acc + um.qty_unassembled + um.qty_assembled + um.qty_in_progress + um.qty_finished
    ), 0),
    'Complete': totalNumModels > 0 ? Math.round(((numByStatus['finished'] / totalNumModels) * 100)) + '%' : '0%'
  }

  const factionById = props.factions.reduce((acc: Record<number, Faction>, faction) => {
    acc[faction.id] = faction;
    return acc;
  }, {});

  const userModelsByUserFactionId = props.userModels.reduce((acc: Record<number, UserModel[]>, userModel) => {
    const key = userModel.user_faction_id;
    if (!acc[key]) acc[key] = [];
    acc[key].push(userModel);
    return acc;
  }, {});

  const gameSystemSections = props.gameSystems.map((gameSystem) => {
    const userFactionSections =
      props.userFactions
        .filter((userFaction) => factionById[userFaction.faction_id]?.game_system_id === gameSystem.id)
        .map((userFaction) => {
          const userFactionUserModels = userModelsByUserFactionId[userFaction.id];
          return {
            faction: factionById[userFaction.faction_id],
            userFaction: userFaction,
            factionNumByStatus: countByStatus(userFactionUserModels),
            numImages: props.numImagesByUserFactionId[userFaction.id] || 0
          };
        })
        .sort((a, b) => {
          const aNumModels = Object.values(a.factionNumByStatus).reduce((acc, n) => acc + n);
          const bNumModels = Object.values(b.factionNumByStatus).reduce((acc, n) => acc + n);
          // Sort by num models descending
          if (aNumModels > bNumModels) return -1;
          if (aNumModels < bNumModels) return 1;
          if (a.faction.name < b.faction.name) return -1;
          if (a.faction.name > b.faction.name) return 1;
          return 0;
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
