import React, { useEffect, useState } from "react";
import { GameSystem } from "../types/models";
import GameSystemListItem from "./GameSystemListItem";
import Input from "../common/Input";

type Props = {
  gameSystems: GameSystem[];
  numUsersByGameSystemId: Record<number, number>;
};

const GameSystemList = (props: Props) => {
  const [filteredGameSystems, setFilteredGameSystems] = useState<GameSystem[]>(props.gameSystems);
  const [filterString, setFilterString] = useState('');

  useEffect(() => {
    setFilteredGameSystems(
      props.gameSystems.filter((gameSystem) => {
        return gameSystem.name.toLowerCase().includes(filterString);
      })
    );
  }, [filterString]);

  return (
    <div id='explore-game-systems overflow-hidden'>
      <Input
        onChange={(e) => setFilterString(e.target.value.toLowerCase())}
        placeholder='Search'
        className='mb-3' />

      <div className='overflow-y-auto overscroll-contain'>
        {filteredGameSystems.map((gameSystem) => (
          <GameSystemListItem
            key={gameSystem.id}
            gameSystem={gameSystem}
            numUsers={props.numUsersByGameSystemId[gameSystem.id]}
            className='mb-3' />
        ))}
      </div>
    </div>
  );
};

export default GameSystemList;
