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
end
