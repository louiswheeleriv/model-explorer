class MyCollectionController < ApplicationController
  def index
    redirect_to '/sign_in' unless current_user_id
  end

  def show_faction
    if current_user_id
      @faction = Faction.find_by(name: params[:faction_name])
    else
      redirect_to '/sign_in'
    end
  end

  def add_faction
    faction_id = params[:faction_id]
    faction = ::Faction.find_by(id: faction_id)
    raise 'Faction not found' unless faction

    user_faction = ::UserFaction.find_by(user_id: current_user_id, faction_id: faction_id)
    raise "Faction #{faction.name} is already in your collection" if user_faction

    user_faction = ::UserFaction.create(user_id: current_user_id, faction_id: faction_id)
    render status: 200, json: { status: 200, user_faction: user_faction, faction: faction }
  end
end
