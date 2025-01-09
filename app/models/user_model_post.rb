# == Schema Information
#
# Table name: user_model_posts
#
#  id            :bigint           not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  post_id       :integer          not null
#  user_id       :integer          not null
#  user_model_id :integer          not null
#
# Indexes
#
#  index_user_model_posts_on_post_id  (post_id)
#
class UserModelPost < ApplicationRecord
  belongs_to :user
  belongs_to :post
  belongs_to :user_model
end
