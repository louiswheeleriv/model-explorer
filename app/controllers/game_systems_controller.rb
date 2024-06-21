class GameSystemsController < ApplicationController
  def create
    require_logged_in!
    
    name = params[:name]
    gs = ::GameSystem.find_by(name: name)
    return render status: 400, json: { status: 400, error: "GameSystem with name #{name} already exists." } if gs

    gs = ::GameSystem.create(name: name)
    render status: 200, json: { status: 200, game_system: gs }
  end
end
