class HomeController < ApplicationController
  def index
    if current_user_id
      redirect_to '/my-collection'
    else
      redirect_to '/welcome'
    end
  end

  def welcome
  end
end
