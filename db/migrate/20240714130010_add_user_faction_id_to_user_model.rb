class AddUserFactionIdToUserModel < ActiveRecord::Migration[7.1]
  def change
    add_column :user_models, :user_faction_id, :bigint

    ActiveRecord::Base.transaction do
      User.find_each do |u|
        faction_ids = u.user_models.map(&:model).map(&:faction_id).uniq
        faction_ids.each do |faction_id|
          ::UserFaction.find_or_create_by(
            user_id: u.id,
            faction_id: faction_id
          )
        end
      end
  
      UserModel.find_each do |um|
        um.update!(
          user_faction_id: UserFaction.find_by(
            user_id: um.user_id,
            faction_id: um.model.faction_id
          ).id
        )
      end
    end
    
    change_column_null :user_models, :user_faction_id, false
    add_index :user_models, :user_faction_id
  end
end
