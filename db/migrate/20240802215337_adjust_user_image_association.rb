class AdjustUserImageAssociation < ActiveRecord::Migration[7.1]
  def change
    rename_table :user_image_associations, :user_model_image_associations
    add_column :user_model_image_associations, :sort_index, :integer, null: false
  end
end
