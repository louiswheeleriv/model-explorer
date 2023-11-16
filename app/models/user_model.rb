# == Schema Information
#
# Table name: user_models
#
#  id         :bigint           not null, primary key
#  name       :string
#  quantity   :integer          not null
#  status     :integer          default("unassembled"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  model_id   :integer          not null
#  user_id    :integer          not null
#
# Indexes
#
#  index_user_models_on_model_id  (model_id)
#  index_user_models_on_user_id   (user_id)
#
class UserModel < ApplicationRecord
  belongs_to :user
  belongs_to :model
  has_many :user_image_associations

  enum :status, [:unassembled, :assembled, :in_progress, :finished]
end
