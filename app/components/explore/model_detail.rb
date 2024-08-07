module Explore
  class ModelDetail < ReactComponent
    def initialize(raw_props = {})
      super('ModelDetail', raw_props: raw_props)
    end
  
    def props
      model = ::Model.find(params[:model_id])
      faction = model.faction
      user_models = model.user_models
      user_model_image_associations = ::UserModelImageAssociation.where(user_model_id: user_models.pluck(:id))

      raw_props.merge(
        current_user: ::User.find_by(id: current_user_id)&.to_safe_attributes,
        game_system: faction.game_system,
        faction: faction,
        model: model,
        users: ::User.where(id: user_models.distinct.pluck(:user_id)).map(&:to_safe_attributes),
        user_models: user_models,
        user_images: ::UserImage.where(id: user_model_image_associations.distinct.pluck(:user_image_id)),
        user_model_image_associations: user_model_image_associations
      )
    end
  end  
end
