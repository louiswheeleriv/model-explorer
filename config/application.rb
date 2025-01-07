require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ModelExplorer
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w(assets tasks clock.rb))

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true

    config.x.encryption_key = ENV.fetch('ENCRYPTION_KEY')
    config.x.ssl_certificate = ENV.fetch('SSL_CERTIFICATE')

    config.x.aws = Hashie::Mash.new
    config.x.aws.region = ENV.fetch('AWS_REGION', 'us-east-2')
    config.x.aws.access_key_id = ENV.fetch('AWS_ACCESS_KEY_ID', 'not-an-access-key')
    config.x.aws.secret_access_key = ENV.fetch('AWS_SECRET_ACCESS_KEY', 'not-a-secret-access-key')
    config.x.aws.s3_bucket_name = ENV.fetch('S3_BUCKET_NAME', 'not-an-s3-bucket')

    config.x.email = Hashie::Mash.new
    config.x.email.support_address = 'support@mini-painter.com'

    config.session_store :cookie_store, key: '_interslice_session'
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use config.session_store, config.session_options
  end
end
