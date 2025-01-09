# == Schema Information
#
# Table name: post_reactions
#
#  id         :bigint           not null, primary key
#  reaction   :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  post_id    :integer          not null
#  user_id    :integer          not null
#
# Indexes
#
#  index_post_reactions_on_post_id_and_reaction  (post_id,reaction)
#
class PostReaction < ApplicationRecord
  belongs_to :user
  belongs_to :post
end
