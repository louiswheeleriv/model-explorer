Bugsnag.configure do |config|
  config.api_key = ENV.fetch('BUGSNAG_API_KEY', 'not-an-api-key')
  config.enabled_release_stages = ['production']
end
