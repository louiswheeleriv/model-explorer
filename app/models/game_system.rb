# == Schema Information
#
# Table name: game_systems
#
#  id         :bigint           not null, primary key
#  created_by :integer
#  name       :string           not null
#  updated_by :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_game_systems_on_name  (name) UNIQUE
#
class GameSystem < ApplicationRecord
  has_many :factions, dependent: :destroy
end
