class AddUserModels < ActiveRecord::Migration[7.1]
  def change
    create_table :user_models do |t|
      t.integer :user_id, null: false
      t.integer :model_id, null: false
      t.string :name
      t.integer :quantity, null: false
      t.integer :status, null: false, default: 0

      t.timestamps
    end

    add_index :user_models, :user_id
    add_index :user_models, :model_id
  end
end
