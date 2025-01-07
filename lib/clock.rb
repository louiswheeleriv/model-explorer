require_relative '../config/boot'
require_relative '../config/environment'
require 'clockwork'
include Clockwork

every(24.hours, 'Clean up orphaned images', at: '03:00') do
  Delayed::Job.enqueue(OrphanedUserImageCleanupJob.new)
end
