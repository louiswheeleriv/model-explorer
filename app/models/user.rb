# == Schema Information
#
# Table name: users
#
#  id                              :bigint           not null, primary key
#  bio                             :text
#  display_name                    :string
#  email                           :string           default("foo@test.com"), not null
#  encrypted_password              :string           not null
#  encrypted_password_iv           :string           not null
#  password_reset_code             :string
#  password_reset_code_valid_until :datetime
#  username                        :string           not null
#  created_at                      :datetime         not null
#  updated_at                      :datetime         not null
#  profile_picture_id              :bigint
#
# Indexes
#
#  index_users_on_username  (username) UNIQUE
#
class User < ApplicationRecord
  has_many :user_factions, dependent: :destroy
  has_many :user_model_groups, dependent: :destroy
  has_many :user_models, dependent: :destroy
  has_many :user_images, dependent: :destroy
  has_many :user_image_associations, dependent: :destroy

  has_many :posts, dependent: :destroy
  has_many :post_reactions, dependent: :destroy
  has_many :post_comments, dependent: :destroy
  has_many :user_model_posts, dependent: :destroy

  has_many :user_follows_sent,
           class_name: 'UserFollow',
           foreign_key: 'following_user_id',
           dependent: :destroy
  has_many :user_follows_received,
           class_name: 'UserFollow',
           foreign_key: 'followed_user_id',
           dependent: :destroy


  attr_encrypted :password, key: Rails.configuration.x.encryption_key

  def to_safe_attributes
    attributes.except('password', 'encrypted_password', 'encrypted_password_iv')
  end

  def password_length
    password.length
  end

  def profile_picture
    ::UserImage.find_by(id: profile_picture_id)
  end

  def following
    User
      .joins('INNER JOIN user_follows ON user_follows.followed_user_id = users.id')
      .where('user_follows.following_user_id = ?', id)
  end

  def followers
    User
      .joins('INNER JOIN user_follows ON user_follows.following_user_id = users.id')
      .where('user_follows.followed_user_id = ?', id)
  end

end
