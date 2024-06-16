# == Schema Information
#
# Table name: factions
#
#  id             :bigint           not null, primary key
#  name           :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  game_system_id :bigint           not null
#
class Faction < ApplicationRecord
  belongs_to :game_system
  has_many :models
end
