class PasswordResetMailer < ApplicationMailer

  def password_reset_email
    @user = User.find(params[:user_id])
    @password_reset_url  = "https://mini-painter.com/password-reset?code=#{params[:password_reset_code]}"
    mail(to: @user.email, subject: 'MiniPainter - Password Reset')
  end
end
