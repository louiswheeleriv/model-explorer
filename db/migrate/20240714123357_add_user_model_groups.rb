class AddUserModelGroups < ActiveRecord::Migration[7.1]
  def change
    create_table :user_model_groups do |t|
      t.bigint :user_id, null: false
      t.bigint :user_faction_id, null: false
      t.string :name, null: false
      t.integer :sort_index, null: false

      t.timestamps
    end
    add_index :user_model_groups, [:user_faction_id, :name], unique: true
  end
end
