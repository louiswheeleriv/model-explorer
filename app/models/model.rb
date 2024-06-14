# == Schema Information
#
# Table name: models
#
#  id             :bigint           not null, primary key
#  name           :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  faction_id     :integer          not null
#  game_system_id :bigint           not null
#
# Indexes
#
#  index_models_on_faction_id  (faction_id)
#
class Model < ApplicationRecord
  belongs_to :faction
  has_many :user_models
end
