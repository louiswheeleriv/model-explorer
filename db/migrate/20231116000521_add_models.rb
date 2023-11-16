class AddModels < ActiveRecord::Migration[7.1]
  def change
    create_table :models do |t|
      t.string :name, null: false
      t.integer :faction_id, null: false

      t.timestamps
    end

    add_index :models, :faction_id
  end
end
