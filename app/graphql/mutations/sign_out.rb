# frozen_string_literal: true

module Mutations
  class SignOut < BaseMutation
    field :success, Boolean, null: false

    def resolve
      context[:session][:user_id] = nil

      { success: true }
    end
  end
end