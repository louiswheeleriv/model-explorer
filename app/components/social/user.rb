module Social
  class User < ReactComponent
    def initialize(raw_props = {})
      super('User', raw_props: raw_props)
    end
  
    def props
      user = ::User.find_by(id: params[:user_id])
      user_factions = user.user_factions
      factions = ::Faction.where(id: user_factions.distinct.pluck(:faction_id))
      user_models = ::UserModel.where(user_faction_id: user_factions.pluck(:id))

      num_user_faction_image_associations_by_user_faction_id =
        ::UserImageAssociation
          .where(user_faction_id: user_factions.pluck(:id))
          .group(:user_faction_id)
          .count
      num_user_model_image_associations_by_user_faction_id =
        ::UserImageAssociation
          .where(user_model_id: user_models.pluck(:id))
          .joins(:user_model)
          .group('user_models.user_faction_id')
          .count
      num_images_by_user_faction_id =
        user_factions.pluck(:id).map do |user_faction_id|
          num_images =
            (num_user_faction_image_associations_by_user_faction_id[user_faction_id] || 0) +
            (num_user_model_image_associations_by_user_faction_id[user_faction_id] || 0)
          [user_faction_id, num_images]
        end.to_h

      raw_props.merge(
        current_user_id: current_user_id,
        user: user.to_safe_attributes,
        profile_picture: user.profile_picture,
        game_systems: ::GameSystem.where(id: factions.distinct.pluck(:game_system_id)),
        factions: factions,
        user_factions: user_factions,
        models: ::Model.where(id: user_models.distinct.pluck(:model_id)),
        user_models: user_models,
        num_images_by_user_faction_id: num_images_by_user_faction_id,
        is_followed_by_current_user: current_user_id.present? && user.followers.exists?(current_user_id),
      )
    end
  end  
end
