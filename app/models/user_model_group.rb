# == Schema Information
#
# Table name: user_model_groups
#
#  id              :bigint           not null, primary key
#  name            :string           not null
#  sort_index      :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  user_faction_id :bigint           not null
#  user_id         :bigint           not null
#
# Indexes
#
#  index_user_model_groups_on_user_faction_id_and_name  (user_faction_id,name) UNIQUE
#
class UserModelGroup < ApplicationRecord
  belongs_to :user
  belongs_to :user_faction
  has_many :user_models, dependent: :nullify
end
