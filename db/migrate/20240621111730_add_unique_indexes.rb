class AddUniqueIndexes < ActiveRecord::Migration[7.1]
  def change
    add_index :user_models, [:user_id, :model_id, :name], unique: true
    add_index :models, [:faction_id, :name], unique: true
    add_index :game_systems, :name, unique: true
    add_index :factions, [:game_system_id, :name], unique: true
  end
end
