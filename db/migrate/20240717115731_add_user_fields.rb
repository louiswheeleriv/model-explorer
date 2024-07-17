class AddUserFields < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :display_name, :string
    add_column :users, :profile_picture_id, :bigint
    add_column :users, :bio, :text
  end
end
