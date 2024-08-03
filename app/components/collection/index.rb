module Collection
  class Index < ReactComponent
    def initialize(raw_props = {})
      super('Collection', raw_props: raw_props)
    end
  
    def props
      user_factions = ::UserFaction.where(user_id: current_user_id)
      user_models = ::UserModel.where(user_id: current_user_id)
      models = ::Model.where(id: user_models.distinct.pluck(:model_id))
      all_factions = ::Faction.all
      all_game_systems = ::GameSystem.all
      user_faction_factions = ::Faction.where(id: user_factions.distinct.pluck(:faction_id))
      user_game_systems = all_game_systems.where(id: user_faction_factions.distinct.pluck(:game_system_id))
      raw_props.merge(
        user_factions: user_factions,
        user_models: user_models,
        models: models,
        all_factions: all_factions,
        all_game_systems: all_game_systems,
        user_game_systems: user_game_systems,
      )
    end
  end  
end
