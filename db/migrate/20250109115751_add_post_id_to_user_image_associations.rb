class AddPostIdToUserImageAssociations < ActiveRecord::Migration[7.1]
  def change
    add_column :user_image_associations, :post_id, :integer
    add_index :user_image_associations, :post_id
  end
end
