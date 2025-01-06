class ApplicationMailer < ActionMailer::Base
  default from: Rails.configuration.x.email.support_address
  layout "mailer"
end
