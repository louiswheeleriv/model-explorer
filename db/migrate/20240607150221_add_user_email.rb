class AddUserEmail < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :email, :string, null: false, default: 'foo@test.com'
  end
end
