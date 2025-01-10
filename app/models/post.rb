# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  body       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer          not null
#
# Indexes
#
#  index_posts_on_user_id  (user_id)
#
class Post < ApplicationRecord
  belongs_to :user
  has_many :post_reactions, dependent: :destroy
  has_many :post_comments, dependent: :destroy
  has_many :user_model_posts, dependent: :destroy
  has_many :user_model_image_associations, dependent: :nullify
end
