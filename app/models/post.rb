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
  has_many :user_image_associations, dependent: :nullify

  def user_models
    UserModel
      .joins('INNER JOIN user_model_posts ON user_model_posts.user_model_id = user_models.id')
      .where('user_model_posts.post_id = ?', id)
  end

  def user_images
    UserImage
      .joins('INNER JOIN user_image_associations ON user_image_associations.user_image_id = user_images.id')
      .where('user_image_associations.post_id = ?', id)
  end
end
