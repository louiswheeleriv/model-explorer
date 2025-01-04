Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # origins [Rails.configuration.x.client_domain]
    origins { |source, env| true }
    # origins [/localhost/, /mini-painter\.com/]
    resource '*', headers: :any, methods: :any, credentials: true, if: ->(x) { true }
  end
end
