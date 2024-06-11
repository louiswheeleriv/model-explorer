class SslController < ApplicationController
  def certificate
    render plain: Rails.configuration.x.ssl_certificate
  end
end