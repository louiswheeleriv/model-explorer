# frozen_string_literal: true

module Types
  class UserModel < BaseObject
    field :id, ID, null: false
    field :name, String, null: true

    field :user, Types::User, null: false
    field :model, Types::Model, null: false
    field :user_image_associations, [Types::UserImageAssociation], null: false

    field :qty_unassembled, Int, null: false
    field :qty_assembled, Int, null: false
    field :qty_in_progress, Int, null: false
    field :qty_finished, Int, null: false
  end
end
