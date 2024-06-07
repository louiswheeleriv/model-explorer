# frozen_string_literal: true

module Types
  class User < BaseObject
    field :id, ID, null: false
    field :username, String, null: false
    field :email, String, null: false

    field :user_models, [Types::UserModel], null: false
    field :user_images, [Types::UserImage], null: false
    field :user_image_associations, [Types::UserImageAssociation], null: false
  end
end
