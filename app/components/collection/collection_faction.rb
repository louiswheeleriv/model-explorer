module Collection
  class CollectionFaction < ReactComponent
    def initialize(raw_props = {})
      super('CollectionFaction', raw_props: raw_props)
    end

    def props
      user_faction = ::UserFaction.find_by(id: params[:user_faction_id])
      user_models = user_faction.user_models
      faction = user_faction.faction
      faction_model_by_id =
        ::Model
          .where(faction_id: user_faction.faction_id)
          .map { |model| [model.id, model] }.to_h
      
      user_image_associations =
        ::UserImageAssociation
          .where(user_faction_id: user_faction.id)
          .or(
            ::UserImageAssociation.where(user_model_id: user_models.pluck(:id))
          )

      raw_props.merge(
        is_current_user: current_user_id == user_faction.user_id,
        user: user_faction.user.to_safe_attributes,
        game_system: faction.game_system,
        faction: faction,
        user_faction: user_faction,
        faction_model_by_id: faction_model_by_id,
        user_model_groups: user_faction.user_model_groups.order(sort_index: :asc),
        user_models: user_models,
        user_images: ::UserImage.where(id: user_image_associations.distinct.pluck(:user_image_id)),
        user_image_associations: user_image_associations.order(sort_index: :asc)
      )
    end
  end
end
