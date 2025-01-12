class ApplicationController < ActionController::Base
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
    return if current_user_id

    render status: 401, json: { status: 401, error: 'Unauthorized' }
  end
end
