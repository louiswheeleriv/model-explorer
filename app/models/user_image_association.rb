# == Schema Information
#
# Table name: user_image_associations
#
#  id              :bigint           not null, primary key
#  sort_index      :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  post_id         :integer
#  user_faction_id :integer
#  user_id         :integer          not null
#  user_image_id   :integer          not null
#  user_model_id   :integer
#
# Indexes
#
#  index_user_image_associations_on_post_id          (post_id)
#  index_user_image_associations_on_user_faction_id  (user_faction_id)
#  index_user_image_associations_on_user_id          (user_id)
#  index_user_image_associations_on_user_image_id    (user_image_id)
#  index_user_image_associations_on_user_model_id    (user_model_id)
#
class UserImageAssociation < ApplicationRecord
  belongs_to :user
  belongs_to :user_image
  belongs_to :user_faction, optional: true
  belongs_to :user_model, optional: true
  belongs_to :post, optional: true

  validate :mutually_exclusive_associations

  def mutually_exclusive_associations
    if [user_faction_id, user_model_id, post_id].compact.length != 1
      errors.add(
        :user_faction_id,
        'UserImageAssociation must have exactly one of [user_faction_id, user_model_id, post_id]'
      )
    end
  end

end
