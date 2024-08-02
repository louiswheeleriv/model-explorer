# == Schema Information
#
# Table name: user_models
#
#  id                  :bigint           not null, primary key
#  name                :string
#  notes               :text
#  qty_assembled       :integer          default(0), not null
#  qty_finished        :integer          default(0), not null
#  qty_in_progress     :integer          default(0), not null
#  qty_unassembled     :integer          default(0), not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  model_id            :integer          not null
#  user_faction_id     :bigint           not null
#  user_id             :integer          not null
#  user_model_group_id :bigint
#
# Indexes
#
#  index_user_models_on_model_id                       (model_id)
#  index_user_models_on_user_faction_id                (user_faction_id)
#  index_user_models_on_user_id                        (user_id)
#  index_user_models_on_user_id_and_model_id_and_name  (user_id,model_id,name) UNIQUE
#  index_user_models_on_user_model_group_id            (user_model_group_id)
#
class UserModel < ApplicationRecord
  belongs_to :user
  belongs_to :model
  belongs_to :user_faction
  belongs_to :user_model_group, optional: true
  has_many :user_model_image_associations, dependent: :destroy
  has_many :user_images, through: :user_model_image_associations

  def quantity_by_status
    {
      unassembled: qty_unassembled,
      assembled: qty_assembled,
      in_progress: qty_in_progress,
      finished: qty_finished
    }
  end
end
