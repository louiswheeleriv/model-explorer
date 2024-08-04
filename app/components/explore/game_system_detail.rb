module Explore
  class GameSystemDetail < ReactComponent
    def initialize(raw_props = {})
      super('GameSystemDetail', raw_props: raw_props)
    end
  
    def props
      game_system = ::GameSystem.find(params[:game_system_id])
      
      num_users_by_faction_id =
        game_system
          .factions
          .joins(:user_factions)
          .group(:faction_id)
          .distinct
          .count('user_id')

      # Sort Factions by most Users
      factions = ::Faction.find(
        num_users_by_faction_id
          .sort_by(&:last)
          .reverse
          .map(&:first)
      )

      raw_props.merge(
        game_system: game_system,
        factions: factions,
        num_users_by_faction_id: num_users_by_faction_id
      )
    end
  end  
end
