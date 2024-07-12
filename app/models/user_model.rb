# == Schema Information
#
# Table name: user_models
#
#  id              :bigint           not null, primary key
#  name            :string
#  qty_assembled   :integer          default(0), not null
#  qty_finished    :integer          default(0), not null
#  qty_in_progress :integer          default(0), not null
#  qty_unassembled :integer          default(0), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  model_id        :integer          not null
#  user_id         :integer          not null
#
# Indexes
#
#  index_user_models_on_model_id                       (model_id)
#  index_user_models_on_user_id                        (user_id)
#  index_user_models_on_user_id_and_model_id_and_name  (user_id,model_id,name) UNIQUE
#
class UserModel < ApplicationRecord
  belongs_to :user
  belongs_to :model
  has_many :user_image_associations, dependent: :destroy

  def quantity_by_status
    {
      unassembled: qty_unassembled,
      assembled: qty_assembled,
      in_progress: qty_in_progress,
      finished: qty_finished
    }
  end
end
