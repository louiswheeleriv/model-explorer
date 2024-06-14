class AddGameSystemAssociations < ActiveRecord::Migration[7.1]
  def change
    gs = GameSystem.find_or_create_by(name: 'Example Game')

    add_column :factions, :game_system_id, :bigint
    add_column :models, :game_system_id, :bigint

    Faction.where(game_system_id: nil).update_all(game_system_id: gs.id)
    Model.where(game_system_id: nil).update_all(game_system_id: gs.id)

    change_column_null :factions, :game_system_id, false
    change_column_null :models, :game_system_id, false
  end
end
