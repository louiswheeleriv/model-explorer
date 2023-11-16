# frozen_string_literal: true

module Types
  class Faction < BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :models, [Types::Model], null: false
  end
end
