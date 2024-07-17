class ApplicationController < ActionController::Base
  def current_user_id
    session[:current_user_id]
  end

  def require_logged_in!
    return if current_user_id

    redirect_to('/sign-in')
  end
end
