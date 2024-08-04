class AddUserTraceToFactionsModels < ActiveRecord::Migration[7.1]
  def change
    add_column :game_systems, :created_by, :integer
    add_column :game_systems, :updated_by, :integer
    add_column :factions, :created_by, :integer
    add_column :factions, :updated_by, :integer
    add_column :models, :created_by, :integer
    add_column :models, :updated_by, :integer
  end
end
