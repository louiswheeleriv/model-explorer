class MyCollections < ReactComponent
  def initialize(raw_props = {})
    super('MyCollections', raw_props: raw_props)
  end

  def props
    user_models = ::UserModel.where(user_id: current_user_id)
    models = ::Model.where(id: user_models.distinct.pluck(:model_id))
    factions = ::Faction.where(id: models.distinct.pluck(:faction_id))
    game_systems = ::GameSystem.where(id: factions.distinct.pluck(:game_system_id))
    raw_props.merge(
      user_models: user_models,
      models: models,
      factions: factions,
      game_systems: game_systems,
    )
  end

  private

  def current_user_id
    session[:current_user_id]
  end
end
