# == Schema Information
#
# Table name: users
#
#  id                    :bigint           not null, primary key
#  email                 :string           default("foo@test.com"), not null
#  encrypted_password    :string           not null
#  encrypted_password_iv :string           not null
#  username              :string           not null
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#
# Indexes
#
#  index_users_on_username  (username) UNIQUE
#
class User < ApplicationRecord
  has_many :user_models
  has_many :user_images
  has_many :user_image_associations

  attr_encrypted :password, key: Rails.configuration.x.encryption_key
end
