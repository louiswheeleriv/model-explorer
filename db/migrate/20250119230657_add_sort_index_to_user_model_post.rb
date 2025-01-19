class AddSortIndexToUserModelPost < ActiveRecord::Migration[7.1]
  def change
    add_column :user_model_posts, :sort_index, :integer, null: false
  end
end
