class UnifyImageAssociationModels < ActiveRecord::Migration[7.1]

  class UserFactionImageAssociation < ActiveRecord::Base
    self.table_name = 'user_faction_image_associations'
  end

  class UserModelImageAssociation < ActiveRecord::Base
    self.table_name = 'user_model_image_associations'
  end

  class UserImageAssociation < ActiveRecord::Base
    self.table_name = 'user_image_associations'
  end

  def up
    add_column :user_faction_image_associations, :user_model_id, :integer
    change_column_null :user_faction_image_associations, :user_faction_id, true
    add_index :user_faction_image_associations, :user_model_id

    rename_table :user_faction_image_associations, :user_image_associations

    ActiveRecord::Base.transaction do
      UserModelImageAssociation.find_each do |assoc|
        UserImageAssociation.create(
          user_id: assoc.user_id,
          user_image_id: assoc.user_image_id,
          user_model_id: assoc.user_model_id,
          sort_index: assoc.sort_index
        )
        assoc.destroy!
      end
    end

    drop_table :user_model_image_associations
  end

  def down
    create_table :user_model_image_associations do |t|
      t.integer :user_id, null: false
      t.integer :user_image_id, null: false
      t.integer :user_model_id, null: false
      t.integer :sort_index, null: false
      t.timestamps
    end
    add_index :user_model_image_associations, :user_id
    add_index :user_model_image_associations, :user_image_id
    add_index :user_model_image_associations, :user_model_id

    ActiveRecord::Base.transaction do
      UserImageAssociation.where.not(user_model_id: nil).find_each do |assoc|
        UserModelImageAssociation.create(
          user_id: assoc.user_id,
          user_image_id: assoc.user_image_id,
          user_model_id: assoc.user_model_id,
          sort_index: assoc.sort_index
        )
        assoc.destroy!
      end
    end

    rename_table :user_image_associations, :user_faction_image_associations

    remove_index :user_faction_image_associations, :user_model_id
    change_column_null :user_faction_image_associations, :user_faction_id, false
    remove_column :user_faction_image_associations, :user_model_id
  end
end
