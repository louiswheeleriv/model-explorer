module Collection
  class Index < ReactComponent
    def initialize(raw_props = {})
      super('Collection', raw_props: raw_props)
    end
  
    def props
      user = ::User.find_by(id: current_user_id)
      user_factions = ::UserFaction.where(user_id: current_user_id)
      user_models = ::UserModel.where(user_id: current_user_id)
      models = ::Model.where(id: user_models.distinct.pluck(:model_id))
      all_factions = ::Faction.all
      all_game_systems = ::GameSystem.all
      user_faction_factions = ::Faction.where(id: user_factions.distinct.pluck(:faction_id))
      user_game_systems = all_game_systems.where(id: user_faction_factions.distinct.pluck(:game_system_id))

      num_user_faction_image_associations_by_user_faction_id =
        ::UserImageAssociation
          .where(user_faction_id: user_factions.pluck(:id))
          .group(:user_faction_id)
          .count
      num_user_model_image_associations_by_user_faction_id =
        ::UserImageAssociation
          .where(user_model_id: user_models.pluck(:id))
          .joins(:user_model)
          .group(:user_faction_id)
          .count
      num_images_by_user_faction_id =
        user_factions.pluck(:id).map do |user_faction_id|
          num_images =
            (num_user_faction_image_associations_by_user_faction_id[user_faction_id] || 0) +
            (num_user_model_image_associations_by_user_faction_id[user_faction_id] || 0)
          [user_faction_id, num_images]
        end.to_h

      raw_props.merge(
        user: user.to_safe_attributes,
        user_factions: user_factions,
        user_models: user_models,
        models: models,
        all_factions: all_factions,
        all_game_systems: all_game_systems,
        user_game_systems: user_game_systems,
        num_images_by_user_faction_id: num_images_by_user_faction_id
      )
    end
  end  
end
