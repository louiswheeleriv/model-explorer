class AddUserDisplayNameUniqueIndex < ActiveRecord::Migration[7.1]
  def change
    add_index :users, :display_name, unique: true
  end
end
