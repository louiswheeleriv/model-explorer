class FactionsController < ApplicationController
  def create
    game_system_id = params[:game_system_id]
    name = params[:name]
    gs = ::GameSystem.find_by(id: game_system_id)
    raise "GameSystem #{game_system_id} not found" unless gs

    faction = ::Faction.find_by(name: name)
    raise "Faction with name #{name} already exists" if faction

    faction = ::Faction.create(game_system_id: gs.id, name: name)
    render status: 200, json: { status: 200, faction: faction }
  end

  def create_model
    faction_id = params[:faction_id]
    model_name = params[:name]
    faction = ::Faction.find_by(id: faction_id)
    raise "Faction #{faction_id} not found" unless faction

    model = faction.models.find_by(name: model_name)
    raise "Faction #{faction.name} already has Model #{model_name}" if model

    model = faction.models.create(name: model_name)
    render status: 200, json: { status: 200, model: model }
  end
end
