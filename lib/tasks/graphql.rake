# frozen_string_literal: true

namespace :graphql do
  DEFAULT_SCHEMA_DUMP_PATH = './app/graphql/schema.graphql'

  task :dump_schema => :environment do
    output_path = ENV.fetch('output_path', DEFAULT_SCHEMA_DUMP_PATH)
    sch = ModelExplorerSchema.to_definition(context: {})
    File.open(output_path, 'wb') { |f| f.write(sch) }
  end
end
