class ApplicationController < ActionController::Base

  class UnauthorizedError < StandardError; end

  def current_user_id
    session[:current_user_id]
  end

  def current_user
    return unless current_user_id

    ::User.find(current_user_id)
  end

  def redirect_home_unless_logged_in!
    return if current_user_id

    redirect_to('/sign-in')
  end

  def raise_unauthorized_unless_logged_in!
    raise UnauthorizedError unless current_user_id
  end
end
