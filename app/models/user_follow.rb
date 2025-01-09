# == Schema Information
#
# Table name: user_follows
#
#  id                :bigint           not null, primary key
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  followed_user_id  :integer          not null
#  following_user_id :integer          not null
#
# Indexes
#
#  index_user_follows_on_followed_user_id   (followed_user_id)
#  index_user_follows_on_following_user_id  (following_user_id)
#
class UserFollow < ApplicationRecord
  belongs_to :following_user, class_name: 'User', foreign_key: 'following_user_id'
  belongs_to :followed_user, class_name: 'User', foreign_key: 'followed_user_id'
end
