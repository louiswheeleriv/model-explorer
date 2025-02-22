# == Schema Information
#
# Table name: user_images
#
#  id         :bigint           not null, primary key
#  url        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer          not null
#
# Indexes
#
#  index_user_images_on_user_id  (user_id)
#
class UserImage < ApplicationRecord
  belongs_to :user
  has_many :user_image_associations, dependent: :destroy
  has_many :user_models, through: :user_image_associations

  after_destroy :delete_from_s3

  def delete_from_s3
    S3Client.new.delete_object(s3_object_key)
  end

  def s3_object_key
    url.split('/').last
  end
end
