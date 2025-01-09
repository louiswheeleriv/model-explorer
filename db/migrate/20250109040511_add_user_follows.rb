class AddUserFollows < ActiveRecord::Migration[7.1]
  def change
    create_table :user_follows do |t|
      t.integer :following_user_id, null: false
      t.integer :followed_user_id, null: false

      t.timestamps
    end

    add_index :user_follows, :following_user_id
    add_index :user_follows, :followed_user_id
  end
end
