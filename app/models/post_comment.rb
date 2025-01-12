# == Schema Information
#
# Table name: post_comments
#
#  id         :bigint           not null, primary key
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  post_id    :integer          not null
#  user_id    :integer          not null
#
# Indexes
#
#  index_post_comments_on_post_id_and_user_id  (post_id,user_id)
#
class PostComment < ApplicationRecord
  belongs_to :user
  belongs_to :post

  has_many :post_reactions, dependent: :destroy
end
