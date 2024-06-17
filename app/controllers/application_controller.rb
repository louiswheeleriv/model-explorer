class ApplicationController < ActionController::Base
  def current_user_id
    session[:current_user_id]
  end
end
