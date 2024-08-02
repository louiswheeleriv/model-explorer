module MyCollection
  class MyCollectionUserModel < ReactComponent
    def initialize(raw_props = {})
      super('MyCollectionUserModel', raw_props: raw_props)
    end

    def props
      user_faction = ::UserFaction.find_by(
        user_id: current_user_id,
        id: params[:user_faction_id]
      )
      user_model = user_faction.user_models.find_by(id: params[:user_model_id])
      raw_props.merge(
        faction: user_faction.faction,
        user_faction: user_faction,
        model: user_model.model,
        user_model: user_model,
        user_model_groups: user_faction.user_model_groups.order(sort_index: :asc),
        user_images: user_model.user_images
      )
    end
  end
end
