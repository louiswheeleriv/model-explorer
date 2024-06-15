import React from "react";
import { GameSystem, Faction, Model, UserModel } from "./types/models";
import SummaryProgressBar from "./SummaryProgressBar";

const MyCollections = ({ user_models, models, factions, game_systems }: { user_models: UserModel[]; models: Model[]; factions: Faction[]; game_systems: GameSystem[]; }) => {
  return (
    <>
      <div className='px-6 py-8 max-w-[600px] mx-auto'>
        <SummaryProgressBar
          numByStatus={
            user_models.reduce((acc: Record<string, number>, userModel) => {
              let status = userModel.status;
              let qty = userModel.quantity;
              if (!acc[status]) acc[status] = 0;
              acc[status] += qty;
              return acc;
            }, {})
          }
          numByLabel={
            {
              'Factions': factions.length,
              'Models': user_models.reduce((acc, um) => (acc + um.quantity), 0)
            }
          }
        />
        <table>
          <thead>
            <tr>
              <th>Model</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model) => (
              <tr key={model.id}>
                <td>{model.name}</td>
                <td>
                  {
                    user_models
                      .filter((um) => um.model_id === model.id)
                      .reduce((acc, um) => acc + um.quantity, 0)
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyCollections;
