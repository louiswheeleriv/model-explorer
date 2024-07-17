class MyProfileController < ApplicationController
  
  def index
    require_logged_in!
  end

end