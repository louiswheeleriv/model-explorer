class AddUserImages < ActiveRecord::Migration[7.1]
  def change
    create_table :user_images do |t|
      t.integer :user_id, null: false
      t.string :url, null: false

      t.timestamps
    end

    add_index :user_images, :user_id
  end
end
