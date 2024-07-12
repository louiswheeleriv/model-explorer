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
# Indexes
#
#  index_factions_on_game_system_id_and_name  (game_system_id,name) UNIQUE
#
class Faction < ApplicationRecord
  belongs_to :game_system
  has_many :models, dependent: :destroy
  has_many :user_factions, dependent: :destroy
end
