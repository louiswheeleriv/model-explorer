class AddPosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.integer :user_id, null: false
      t.text :body

      t.timestamps
    end

    add_index :posts, :user_id
  end
end
