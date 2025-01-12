# == Schema Information
#
# Table name: post_reactions
#
#  id              :bigint           not null, primary key
#  reaction        :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  post_comment_id :integer
#  post_id         :integer
#  user_id         :integer          not null
#
# Indexes
#
#  index_post_reactions_on_comment_id_reaction_id_user_id  (post_comment_id,reaction,user_id) UNIQUE
#  index_post_reactions_on_post_id_reaction_id_user_id     (post_id,reaction,user_id) UNIQUE
#
class PostReaction < ApplicationRecord
  belongs_to :user
  belongs_to :post, optional: true
  belongs_to :post_comment, optional: true

  validate :mutually_exclusive_associations

  MUTUALLY_EXCLUSIVE_FIELDS = ['post_id', 'post_comment_id'].freeze

  def mutually_exclusive_associations
    if MUTUALLY_EXCLUSIVE_FIELDS.map(&method(:public_send)).compact.length != 1
      errors.add(
        :post_id,
        "PostReaction must have exactly one of [#{MUTUALLY_EXCLUSIVE_FIELDS.join(', ')}]"
      )
    end
  end
end
