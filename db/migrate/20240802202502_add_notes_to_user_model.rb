class AddNotesToUserModel < ActiveRecord::Migration[7.1]
  def change
    add_column :user_models, :notes, :text
  end
end
