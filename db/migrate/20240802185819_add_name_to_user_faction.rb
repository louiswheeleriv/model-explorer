class AddNameToUserFaction < ActiveRecord::Migration[7.1]
  def change
    add_column :user_factions, :name, :string
  end
end
