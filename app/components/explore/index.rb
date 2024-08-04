module Explore
  class Index < ReactComponent
    def initialize(raw_props = {})
      super('Explore', raw_props: raw_props)
    end
  
    def props
      num_user_models_by_game_system_id =
        UserModel
          .joins(model: [{faction: :game_system}])
          .group(:game_system_id)
          .count
      
      num_users_by_game_system_id =
        UserFaction
          .joins(faction: :game_system)
          .group(:game_system_id)
          .distinct
          .count(:user_id)

      # Sort GameSystems by most Users
      game_systems = ::GameSystem.find(
        num_users_by_game_system_id
          .sort_by(&:last)
          .reverse
          .map(&:first)
      )

      raw_props.merge(
        game_systems: game_systems,
        num_user_models_by_game_system_id: num_user_models_by_game_system_id,
        num_users_by_game_system_id: num_users_by_game_system_id
      )
    end
  end  
end
