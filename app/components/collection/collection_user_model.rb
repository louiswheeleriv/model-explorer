module Collection
  class CollectionUserModel < ReactComponent
    def initialize(raw_props = {})
      super('CollectionUserModel', raw_props: raw_props)
    end

    def props
      user_model = ::UserModel.find_by(id: params[:user_model_id])
      user_faction = user_model.user_faction
      user_image_associations = user_model.user_image_associations
      raw_props.merge(
        is_current_user: current_user_id == user_model.user_id,
        user: user_model.user.to_safe_attributes,
        faction: user_faction.faction,
        user_faction: user_faction,
        model: user_model.model,
        user_model: user_model,
        user_model_groups: user_faction.user_model_groups.order(sort_index: :asc),
        user_images: ::UserImage.where(id: user_image_associations.distinct.pluck(:user_image_id)),
        user_image_associations: user_image_associations.order(sort_index: :asc)
      )
    end
  end
end
