import React from "react";
import { Faction, GameSystem } from "../types/models";
import FactionList from "./FactionList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";

type Props = {
  game_system: GameSystem;
  factions: Faction[];
  num_users_by_faction_id: Record<number, number>;
};

const GameSystemDetail = (props: Props) => {
  return (
    <div id='game-system-detail' className='px-6 py-8 max-w-[600px] mx-auto'>
      <div className='flex mb-5'>
        <div className='flex-1'>
          <a href='/explore'>
            <FontAwesomeIcon icon={byPrefixAndName.fas['left']} className='mr-1' />
            Game Systems
          </a>
        </div>
        <div className='text-2xl text-center'>
          {props.game_system.name}
        </div>
        <div className='flex-1'></div>
      </div>

      <FactionList
        factions={props.factions}
        numUsersByFactionId={props.num_users_by_faction_id} />
    </div>
  );
};

export default GameSystemDetail;
