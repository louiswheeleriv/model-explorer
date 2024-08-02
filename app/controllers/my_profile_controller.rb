class MyProfileController < ApplicationController
  
  def index
    require_logged_in!
  end

  def update_username
    require_logged_in!

    user = ::User.find_by(id: current_user_id)
    return render status: 400, json: { status: 400, error: 'User not found' } unless user

    new_username = params[:username]
    conflicting_user = ::User.find_by(username: new_username)
    return render status: 400, json: { status: 400, error: "Username #{new_username} is not available" } if conflicting_user

    user.update!(username: new_username)

    render status: 200, json: { status: 200, username: new_username }
  end

  def update_password
    require_logged_in!

    user = ::User.find_by(id: current_user_id)
    return render status: 400, json: { status: 400, error: 'User not found' } unless user

    current_password = params[:current_password]
    new_password = params[:new_password]
    
    return render status: 400, json: { status: 400, error: 'Current password is incorrect' } if current_password != user.password

    return render status: 400, json: { status: 400, error: 'New password is invalid' } if new_password.blank?

    user.update!(password: new_password)

    render status: 200, json: { status: 200 }
  end

  def update_display_name
    require_logged_in!

    user = ::User.find_by(id: current_user_id)
    return render status: 400, json: { status: 400, error: 'User not found' } unless user

    new_name = params[:display_name]
    conflicting_user = ::User.find_by(display_name: new_name)
    return render status: 400, json: { status: 400, error: "A user already exists with name #{new_name}" } if conflicting_user

    user.update!(display_name: new_name)

    render status: 200, json: { status: 200, display_name: new_name }
  end

  def update_email
    require_logged_in!

    user = ::User.find_by(id: current_user_id)
    return render status: 400, json: { status: 400, error: 'User not found' } unless user

    new_email = params[:email]
    conflicting_user = ::User.find_by(email: new_email)
    return render status: 400, json: { status: 400, error: "A user already exists with email #{new_email}" } if conflicting_user

    user.update!(email: new_email)

    render status: 200, json: { status: 200, email: new_email }
  end

  def update_bio
    require_logged_in!

    user = ::User.find_by(id: current_user_id)
    return render status: 400, json: { status: 400, error: 'User not found' } unless user

    bio = params[:bio]
    user.update!(bio: bio)
    render status: 200, json: { status: 200, bio: bio }
  end

  def update_profile_picture
    require_logged_in!

    user = ::User.find_by(id: current_user_id)
    return render status: 400, json: { status: 400, error: 'User not found' } unless user

    ActiveRecord::Base.transaction do
      current_profile_picture = user.profile_picture
      current_profile_picture.destroy! if current_profile_picture
      new_profile_picture = ::UserImage.create(user_id: current_user_id, url: params[:image_url])
      user.update!(profile_picture_id: new_profile_picture.id)
    end
    
    render status: 200, json: { status: 200 }
  end

end