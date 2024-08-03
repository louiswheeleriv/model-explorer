class AddUserFactionImageAssociation < ActiveRecord::Migration[7.1]
  def change
    create_table :user_faction_image_associations do |t|
      t.integer :user_id, null: false
      t.integer :user_image_id, null: false
      t.integer :user_faction_id, null: false
      t.integer :sort_index, null: false

      t.timestamps
    end

    add_index :user_faction_image_associations, :user_id
    add_index :user_faction_image_associations, :user_image_id
    add_index :user_faction_image_associations, :user_faction_id
  end
end
