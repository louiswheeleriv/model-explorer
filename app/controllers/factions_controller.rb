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
end
