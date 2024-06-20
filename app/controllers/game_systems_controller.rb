class GameSystemsController < ApplicationController
  def create
    name = params[:name]
    gs = ::GameSystem.find_by(name: name)
    raise "GameSystem with name #{name} already exists" if gs

    gs = ::GameSystem.create(name: name)
    render status: 200, json: { status: 200, game_system: gs }
  end
end
