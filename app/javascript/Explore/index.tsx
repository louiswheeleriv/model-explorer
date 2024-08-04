import React from "react";
import { GameSystem } from "../types/models";
import GameSystemList from "./GameSystemList";

type Props = {
  game_systems: GameSystem[];
  num_user_models_by_game_system_id: Record<number, number>;
  num_users_by_game_system_id: Record<number, number>;
};

const Explore = (props: Props) => {
  return (
    <div id='explore-index' className='px-6 py-8 max-w-[600px] mx-auto'>
      <div className='text-2xl text-center mb-5'>
        Explore Models
      </div>

      <GameSystemList
        gameSystems={props.game_systems}
        numUsersByGameSystemId={props.num_users_by_game_system_id} />
    </div>
  );
};

export default Explore;
