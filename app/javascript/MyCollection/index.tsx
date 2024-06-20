import React, { Fragment } from "react";
import { UserFaction, GameSystem, Faction, Model, UserModel } from "../types/models";
import { countByStatus } from "../utils/helpers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import $ from 'jquery';
import Button from "../common/Button";

import SummaryProgressBar from "../common/SummaryProgressBar";
import GameSystemSection from "./GameSystemSection";
import AddFactionModal, { openAddFactionModal } from "./AddFactionModal";

const MyCollection = ({ user_factions, user_models, models, all_factions, all_game_systems, user_game_systems }: {
  user_factions: UserFaction[];
  user_models: UserModel[];
  models: Model[];
  all_factions: Faction[];
  factions: Faction[];
  all_game_systems: GameSystem[];
  user_game_systems: GameSystem[];
}) => {
  const numByStatus = countByStatus(user_models);
  let factionById: Record<number, Faction> = {};
  all_factions.forEach((faction) => factionById[faction.id] = faction)

  const valueByLabel = {
    'Factions': user_factions.length,
    'Models': user_models.reduce((acc, um) => (
      acc + um.qty_unassembled + um.qty_assembled + um.qty_in_progress + um.qty_finished
    ), 0),
    'Complete': Math.round((numByStatus['finished'] / Object.values(numByStatus).reduce((acc, num) => acc + num) * 100)) + '%'
  }

  let factionIdByModelId: Record<number, number> = {};
  models.forEach((model) => {
    factionIdByModelId[model.id] = model.faction_id;
  });

  const gameSystemSections = user_game_systems.map((gameSystem) => {
    const factionSections =
      user_factions
        .map((userFaction) => factionById[userFaction.faction_id])
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

        <div className='flex mt-5'>
          <div className='flex-1 text-end'>
            <Button onClick={openAddFactionModal}>
              <FontAwesomeIcon icon={byPrefixAndName.fas['flag']} className='mr-2' />
              New Faction
            </Button>
          </div>
        </div>
        <AddFactionModal userFactions={user_factions} allFactions={all_factions} allGameSystems={all_game_systems} className='' />

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
