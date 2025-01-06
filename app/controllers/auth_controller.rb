class AuthController < ApplicationController

  def show_sign_in
  end

  def show_sign_up
  end

  def show_forgot_password
  end

  def show_sign_out
    session[:current_user_id] = nil
    redirect_to '/'
  end

  def sign_in
    username = params[:username]
    password = params[:password]

    user = User.find_by(username: username)
    return render status: 403, json: { status: 403, error: 'Login credentials invalid' }.to_json unless user && user.password == password

    session[:current_user_id] = user.id

    render status: 200, json: { status: 200, user: user }.to_json
  end

  def sign_up
    username = params[:username]
    display_name = params[:display_name]
    email = params[:email]
    password = params[:password]

    user = User.find_by(username: username)
    return render status: 400, json: { status: 400, error: 'A user already exists with that username' }.to_json if user

    if display_name.present?
      user = User.find_by(display_name: display_name)
      return render status: 400, json: { status: 400, error: 'A user already exists with that display name' }.to_json if user
    end

    user = User.create(
      username: username,
      display_name: display_name.presence,
      email: email,
      password: password
    )
    session[:current_user_id] = user.id

    render status: 200, json: { status: 200, user: user }.to_json
  end

  def forgot_password
    usernameOrEmail = params[:usernameOrEmail]
    user = User.find_by(username: usernameOrEmail)
    user = User.find_by(email: usernameOrEmail) unless user

    puts "Forgot password, user: #{user&.username}"
    return render status: 200, json: { status: 200 }.to_json unless user

    PasswordResetMailer.with(user_id: user.id).password_reset_email.deliver_now
    
    render status: 200, json: { status: 200 }.to_json
  end

  def my_user
    user_id = session[:current_user_id]
    user = User.find_by(id: user_id)
    render status: 200, json: { status: 200, user: user }.to_json
  end

end
