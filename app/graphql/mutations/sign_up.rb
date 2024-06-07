# frozen_string_literal: true

module Mutations
  class SignUp < BaseMutation
    argument :username, String, required: true
    argument :email, String, required: true
    argument :password, String, required: true

    field :user, Types::User, null: false

    def resolve(username:, email:, password:)
      user = User.find_by(username: username)
      raise GraphQL::ExecutionError.new('A user already exists with that username.') if user

      user = User.create(username: username, email: email, password: password)
      context[:session][:user_id] = user.id

      { user: user }
    end
  end
end