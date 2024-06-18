class AddUserFactions < ActiveRecord::Migration[7.1]
  def change
    create_table :user_factions do |t|
      t.bigint :user_id, null: false
      t.bigint :faction_id, null: false

      t.timestamps
    end
    add_index :user_factions, :user_id
    add_index :user_factions, :faction_id
  end
end
