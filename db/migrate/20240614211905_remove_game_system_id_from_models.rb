class RemoveGameSystemIdFromModels < ActiveRecord::Migration[7.1]
  def change
    remove_column :models, :game_system_id, :bigint
  end
end
