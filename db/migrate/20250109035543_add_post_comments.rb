class AddPostComments < ActiveRecord::Migration[7.1]
  def change
    create_table :post_comments do |t|
      t.integer :user_id, null: false
      t.integer :post_id, null: false
      t.text :body, null: false

      t.timestamps
    end

    add_index :post_comments, [:post_id, :user_id]
  end
end
