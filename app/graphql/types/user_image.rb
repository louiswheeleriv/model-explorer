# frozen_string_literal: true

module Types
  class UserImage < BaseObject
    field :id, ID, null: false
    field :url, String, null: false
    
    field :user, Types::User, null: false
    field :user_image_associations, [Types::UserImageAssociation], null: false
  end
end
