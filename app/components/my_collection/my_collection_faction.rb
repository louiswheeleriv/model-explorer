module MyCollection
  class MyCollectionFaction < ReactComponent
    def initialize(raw_props = {})
      super('MyCollectionFaction', raw_props: raw_props)
    end

    def props
      faction_model_by_id = ::Model.where(faction_id: raw_props[:faction].id).map { |model| [model.id, model] }.to_h
      raw_props.merge(
        faction_model_by_id: faction_model_by_id,
        user_models: ::UserModel.where(user_id: current_user_id, model_id: faction_model_by_id.keys)
      )
    end
  end
end
