class PasswordResetMailer < ApplicationMailer

  def password_reset_email
    @user = User.find(params[:user_id])
    @password_reset_url  = "https://mini-painter.com/password-reset"
    mail(to: @user.email, subject: 'MiniPainter - Password Reset')
  end
end
