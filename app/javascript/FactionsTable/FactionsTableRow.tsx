import React from "react";
import { Faction } from "../types/models";

const FactionsTableRow = ({ faction }: { faction: Faction; }) => {
  return (
    <>
      <tr key={faction.id}>
        <td>{faction.id}</td>
        <td>{faction.name}</td>
      </tr>
    </>
  );
};

export default FactionsTableRow;
