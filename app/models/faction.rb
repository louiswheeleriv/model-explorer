# == Schema Information
#
# Table name: factions
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Faction < ApplicationRecord
  has_many :models
end
