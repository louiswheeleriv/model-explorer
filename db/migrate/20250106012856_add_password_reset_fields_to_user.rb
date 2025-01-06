class AddPasswordResetFieldsToUser < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :password_reset_code, :string
    add_column :users, :password_reset_code_valid_until, :datetime
  end
end
