class MyCollectionController < ApplicationController
  def index
    redirect_to '/sign_in' unless current_user_id
  end
end
