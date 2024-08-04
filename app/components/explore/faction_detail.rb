module Explore
  class FactionDetail < ReactComponent
    def initialize(raw_props = {})
      super('FactionDetail', raw_props: raw_props)
    end
  
    def props
      faction = ::Faction.find(params[:faction_id])
      user_factions = faction.user_factions
      
      num_users_by_model_id =
        faction
          .models
          .joins(:user_models)
          .group(:model_id)
          .distinct
          .count('user_id')

      user_faction_image_associations = ::UserFactionImageAssociation.where(user_faction_id: user_factions.pluck(:id))

      raw_props.merge(
        current_user: ::User.find_by(id: current_user_id),
        game_system: faction.game_system,
        faction: faction,
        users: ::User.where(id: user_factions.distinct.pluck(:user_id)),
        user_factions: user_factions,
        models: faction.models.order(name: :asc),
        num_users_by_model_id: num_users_by_model_id,
        user_images: ::UserImage.where(id: user_faction_image_associations.distinct.pluck(:user_image_id)),
        user_faction_image_associations: user_faction_image_associations
      )
    end
  end  
end
