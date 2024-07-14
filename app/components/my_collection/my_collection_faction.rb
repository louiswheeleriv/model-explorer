module MyCollection
  class MyCollectionFaction < ReactComponent
    def initialize(raw_props = {})
      super('MyCollectionFaction', raw_props: raw_props)
    end

    def props
      faction_id = raw_props[:faction].id
      faction_model_by_id = ::Model.where(faction_id: faction_id).map { |model| [model.id, model] }.to_h
      user_faction = ::UserFaction.find_by(user_id: current_user_id, faction_id: faction_id)
      raw_props.merge(
        faction_model_by_id: faction_model_by_id,
        user_model_groups: user_faction.user_model_groups.order(sort_index: :asc),
        user_models: user_faction.user_models
      )
    end
  end
end
