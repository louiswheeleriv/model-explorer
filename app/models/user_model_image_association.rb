# == Schema Information
#
# Table name: user_model_image_associations
#
#  id            :bigint           not null, primary key
#  sort_index    :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_id       :integer          not null
#  user_image_id :integer          not null
#  user_model_id :integer          not null
#
# Indexes
#
#  index_user_model_image_associations_on_user_id        (user_id)
#  index_user_model_image_associations_on_user_image_id  (user_image_id)
#  index_user_model_image_associations_on_user_model_id  (user_model_id)
#
class UserModelImageAssociation < ApplicationRecord
  belongs_to :user
  belongs_to :user_image
  belongs_to :user_model
end
