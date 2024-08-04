import React, { useEffect, useState } from "react";
import { Faction, GameSystem } from "../types/models";
import Input from "../common/Input";
import FactionListItem from "./FactionListItem";

type Props = {
  factions: Faction[];
  numUsersByFactionId: Record<number, number>;
};

const FactionList = (props: Props) => {
  const [filteredFactions, setFilteredFactions] = useState<Faction[]>(props.factions);
  const [filterString, setFilterString] = useState('');

  useEffect(() => {
    setFilteredFactions(
      props.factions.filter((faction) => {
        return faction.name.toLowerCase().includes(filterString);
      })
    );
  }, [filterString]);

  return (
    <div id='explore-factions overflow-hidden'>
      <Input
        onChange={(e) => setFilterString(e.target.value.toLowerCase())}
        placeholder='Search'
        className='mb-3' />

      <div className='overflow-y-auto overscroll-contain'>
        {filteredFactions.map((faction) => (
          <FactionListItem
            key={faction.id}
            faction={faction}
            numUsers={props.numUsersByFactionId[faction.id]}
            className='mb-3' />
        ))}
      </div>
    </div>
  );
};

export default FactionList;
