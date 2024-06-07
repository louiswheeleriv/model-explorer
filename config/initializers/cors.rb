Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins [Rails.configuration.x.client_domain]
    resource '*', headers: :any, methods: :any, credentials: true
  end
end
