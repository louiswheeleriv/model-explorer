class AddFactions < ActiveRecord::Migration[7.1]
  def change
    create_table :factions do |t|
      t.string :name, null: false

      t.timestamps
    end
  end
end
