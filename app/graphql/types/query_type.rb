# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :users, [Types::User], null: false
    
    def users
      ::User.all.order(username: :asc)
    end

    field :user, Types::User, null: true do
      argument :id, ID, required: true
    end

    def user(id:)
      ::User.find_by(id: id)
    end

    field :me, Types::User, null: false

    def me
      user_id = context[:session][:user_id]
      raise 'Not logged in' unless user_id

      ::User.find_by(id: user_id)
    end

    field :factions, [Types::Faction], null: false

    def factions
      ::Faction.all.order(name: :asc)
    end
  end
end
