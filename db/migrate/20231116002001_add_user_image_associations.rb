class AddUserImageAssociations < ActiveRecord::Migration[7.1]
  def change
    create_table :user_image_associations do |t|
      t.integer :user_id, null: false
      t.integer :user_image_id, null: false
      t.integer :user_model_id, null: false

      t.timestamps
    end

    add_index :user_image_associations, :user_id
    add_index :user_image_associations, :user_image_id
    add_index :user_image_associations, :user_model_id
  end
end
