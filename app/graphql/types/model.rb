# frozen_string_literal: true

module Types
  class Model < BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :faction, Types::Faction, null: false
    field :user_models, [Types::UserModel], null: false
  end
end
