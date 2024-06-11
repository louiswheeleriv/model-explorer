class AuthController < ApplicationController

  def show_sign_in
  end

  def show_sign_up
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
    email = params[:email]
    password = params[:password]

    user = User.find_by(username: username)
    return render status: 400, json: { status: 400, error: 'A user already exists with that username' }.to_json if user

    user = User.create(username: username, email: email, password: password)
    session[:current_user_id] = user.id

    render status: 200, json: { status: 200, user: user }.to_json
  end

  def my_user
    user_id = session[:current_user_id]
    user = User.find_by(id: user_id)
    render status: 200, json: { status: 200, user: user }.to_json
  end

end
