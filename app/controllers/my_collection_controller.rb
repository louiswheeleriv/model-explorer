class MyCollectionController < ApplicationController
  def index
    require_logged_in!
  end

  def show_faction
    require_logged_in!
    
    @faction = Faction.find_by(name: params[:faction_name])
  end

  def add_faction
    require_logged_in!
    
    faction_id = params[:faction_id]
    faction = ::Faction.find_by(id: faction_id)
    raise 'Faction not found' unless faction

    user_faction = ::UserFaction.find_by(user_id: current_user_id, faction_id: faction_id)
    raise "Faction #{faction.name} is already in your collection" if user_faction

    user_faction = ::UserFaction.create(user_id: current_user_id, faction_id: faction_id)
    render status: 200, json: { status: 200, user_faction: user_faction, faction: faction }
  end

  def add_user_model
    require_logged_in!

    faction_id = params[:faction_id]
    model_id = params[:model_id]
    user_model_name = params[:name]
    quantity_by_status = params[:quantity_by_status]
    faction = ::Faction.find_by(id: faction_id)
    return render status: 400, json: { status: 400, error: "Faction #{faction_id} not found." } unless faction

    model = ::Model.find_by(id: model_id)
    return render status: 400, json: { status: 400, error: "Model #{model_id} not found." } unless model

    user_model = ::UserModel.create(
      user_id: current_user_id,
      model_id: model_id,
      name: user_model_name,
      qty_unassembled: quantity_by_status['unassembled'],
      qty_assembled: quantity_by_status['assembled'],
      qty_in_progress: quantity_by_status['in_progress'],
      qty_finished: quantity_by_status['finished']
    )

    render status: 200, json: { status: 200, user_model: user_model }
  end

  def edit_model
    require_logged_in!
    
    faction_id = params[:faction_id]
    model_id = params[:model_id]
    quantity_by_status = params[:quantity_by_status]
    faction = ::Faction.find_by(id: faction_id)
    return render status: 400, json: { status: 400, error: "Faction #{faction_id} not found." } unless faction

    model = ::Model.find_by(id: model_id)
    return render status: 400, json: { status: 400, error: "Model #{model_id} not found." } unless model

    user_model = ::UserModel.find_by(
      user_id: current_user_id,
      model_id: model_id
    )
    return render status: 400, json: { status: 400, error: "UserModel for Model #{model_id} not found." } unless user_model

    user_model.update(
      qty_unassembled: quantity_by_status['unassembled'],
      qty_assembled: quantity_by_status['assembled'],
      qty_in_progress: quantity_by_status['in_progress'],
      qty_finished: quantity_by_status['finished']
    )

    render status: 200, json: { status: 200, user_model: user_model }
  end

end
