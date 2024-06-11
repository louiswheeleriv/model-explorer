class SslController < ApplicationController
  def certificate
    render text: Rails.configuration.x.ssl_certificate
  end
end