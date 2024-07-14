class AddUserModelGroupIdToUserModel < ActiveRecord::Migration[7.1]
  def change
    add_column :user_models, :user_model_group_id, :bigint
    add_index :user_models, :user_model_group_id
  end
end
