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

      raw_props.merge(
        user: user,
        profile_picture: user.profile_picture,
        game_systems: ::GameSystem.where(id: factions.distinct.pluck(:game_system_id)),
        factions: factions,
        user_factions: user_factions,
        models: ::Model.where(id: user_models.distinct.pluck(:model_id)),
        user_models: user_models
      )
    end
  end  
end
