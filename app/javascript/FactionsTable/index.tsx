import React from "react";
import FactionsTableRow from "./FactionsTableRow";
import { Faction } from "../types/models";

const FactionsTable = ({ factions, sortOptions }: { factions: Faction[]; sortOptions: string; }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {factions.map((faction) => (
            <FactionsTableRow key={faction.id} faction={faction} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default FactionsTable;
