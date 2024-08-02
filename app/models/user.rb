# == Schema Information
#
# Table name: users
#
#  id                    :bigint           not null, primary key
#  bio                   :text
#  display_name          :string
#  email                 :string           default("foo@test.com"), not null
#  encrypted_password    :string           not null
#  encrypted_password_iv :string           not null
#  username              :string           not null
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  profile_picture_id    :bigint
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
  has_many :user_model_image_associations, dependent: :destroy

  attr_encrypted :password, key: Rails.configuration.x.encryption_key

  def password_length
    password.length
  end

  def profile_picture
    ::UserImage.find_by(id: profile_picture_id)
  end

end
