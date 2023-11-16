# frozen_string_literal: true

module Types
  class UserImageAssociation < BaseObject
    field :id, ID, null: false
    field :user, Types::User, null: false
    field :user_image, Types::UserImage, null: false
    field :user_model, Types::UserModel, null: false
  end
end
