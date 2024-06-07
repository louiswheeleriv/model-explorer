# frozen_string_literal: true

module Mutations
  class SignIn < BaseMutation
    argument :username, String, required: true
    argument :password, String, required: true

    field :user, Types::User, null: false

    def resolve(username:, password:)
      user = User.find_by(username: username)
      raise "Login credentials invalid" unless user && user.password == password

      context[:session][:user_id] = user.id

      { user: user }
    end
  end
end