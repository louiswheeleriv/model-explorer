class AddUserModelPosts < ActiveRecord::Migration[7.1]
  def change
    create_table :user_model_posts do |t|
      t.integer :user_id, null: false
      t.integer :post_id, null: false
      t.integer :user_model_id, null: false

      t.timestamps
    end

    add_index :user_model_posts, :post_id
  end
end
